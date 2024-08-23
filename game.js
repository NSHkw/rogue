import chalk from 'chalk';
import readlineSync from 'readline-sync';
import figlet from 'figlet';

class Player {
  constructor() {
    this.maxhp = 100;
    this.hp = 100;
    this.ad = 5;
    this.ddabulad = 0.3;
    this.shieldproadd = 0.2;
    this.runproadd = 0.1;
  }

  attack(monster) {
    const ddabul = Math.random();
    let resultmessage;

    if (ddabul < this.ddabulad) {
      monster.hp = monster.hp - (this.ad * 2);
      resultmessage = `${this.ad}의 데미지로 몬스터를 공격 이후
연속베기! ${this.ad}의 데미지로 몬스터를 추가로 공격
`
    } else {
      monster.hp -= this.ad;
      resultmessage = `${this.ad}의 데미지로 몬스터를 공격
`
    }
    return { resultmessage };
  }
  levelUp() {
    this.maxhp += 15;
    this.hp = this.maxhp;
    this.ad += 2;
    this.ddabulad += ((Math.random()*0.03) + 0.01);
    this.shieldproadd += ((Math.random()*0.02) + 0.01);
    this.runproadd += ((Math.random()*0.015) + 0.005);
  }

  shield() {
    const shieldpro = Math.random();
    if (shieldpro < this.shieldproadd) {
      return true; // 방어 성공
    } else {
      return false; // 방어 실패
    }
  }

  run() {
    const runpro = Math.random();
    if (runpro < this.runproadd) {
      return true; // 도망 성공
    } else {
      return false; //도망 실패
    }
  }
}

class Monster {
  constructor(stage) {
    this.hp = 100 + (stage - 1) * (Math.ceil(Math.random() * 5) + 1);
    this.ad = 2 + (stage - 1) * (Math.ceil(Math.random() * 2) + 1);
  }

  attack(player) {
    player.hp -= this.ad;
    return `${this.ad}의 데미지로 플레이어를 공격`;
  }
}

function displayStatus(stage, player, monster) {
  console.clear();
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보, 플레이어 체력 ${player.hp}, 플레이어 공격력 ${player.ad}`,
    ) +
    chalk.redBright(
      `| 몬스터 정보 |, 몬스터 체력 ${monster.hp}, 몬스터 공격력 ${monster.ad}`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];
  let turncount = 1;
  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    console.log(chalk.blue(`현재 ${turncount}턴, 플레이어 사이드 선택`));

    logs.forEach((log) => console.log(log));
    logs = [];

    console.log(
      chalk.green(
        `\n1. 공격한다(연속 공격 ${Math.floor(100 * player.ddabulad)}%) 2. 막기 (${Math.floor(100*player.shieldproadd)}%) 3. RUN(${Math.floor(100*player.runproadd)}%)`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    if (choice === "0") {
      console.log("프로그램 종료");
      process.exit(0);
    }
    else if (choice === "1") {
      logs.push(chalk.red(player.attack(monster).resultmessage) + chalk.bgCyan(`=====================`));
      if (monster.hp <= 0) {
        console.log(chalk.green("몬스터를 물리쳤습니다!"));
        return 1;
      } else {
        logs.push(chalk.red(monster.attack(player)));
      }
    }
    else if (choice === "2") {
      logs.push(chalk.red(`${choice}를 선택해 막기`));
      if (player.shield()) {
        logs.push((chalk.blue(`${Math.round(player.shieldproadd * 100)}% 확률로 막기 성공`)) + `
`
          + chalk.bgCyan(`=====================`));
      } else {
        logs.push((chalk.blue(`막기 실패`)) + `
`
          + chalk.bgCyan(`=====================`));
        logs.push(chalk.red(monster.attack(player)));
      }
    }
    else if (choice === "3") {
      logs.push(chalk.red(`${choice}을 선택해 도망`));
      if (player.run()) {
        logs.push(chalk.blue(`${Math.round(player.runproadd * 100)}% 확률로 도망 성공`));
        return 2;
      } else {
        logs.push(chalk.blue(`도망 실패, 도망 치지마 맞서 싸워, 넌 우리의 자존심이야!!!!!!`));
        logs.push(chalk.red(monster.attack(player)));
      }
    }
    else {
      logs.push(chalk.red(`잘못된 선택입니다.`));
    }
    turncount++;
    if (player.hp <= 0) {
      return 0;
    }
  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    const result = await battle(stage, player, monster);

    // 스테이지 클리어 및 보상
    if (stage <= 10) {
      console.log(`스테이지 ${stage}를 클리어 했다`);
      if (result === 1) {
        player.levelUp();
        stage++;
      } else if (result === 2) {
        console.log('플레이어가 도망을 쳤다');
        stage++;
      } else {
        console.log(chalk.red("게임 오버!"));
        break;
      }
      readlineSync.question(chalk.yellowBright(`\n계속하려면 엔터를 누르세요...`));
    }

    //게임 종료 조건
    if (stage > 10) {
      console.log(
        chalk.cyan(
          figlet.textSync('RL- Javascript CLEAR', {
            font: 'hollywood',
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 120
          })
        )
      );
    }
  }
}