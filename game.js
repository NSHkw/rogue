import chalk from 'chalk';
import readlineSync from 'readline-sync';
import figlet from 'figlet';

class Player {
  constructor() {
    this.hp = 100;
    this.ad = 7;
  }

  attack(monster) {
    monster.hp -= this.ad;
    return `${this.ad}의 데미지로 몬스터를 공격`;
  }

  levelUp() {
    this.hp += 11;
    this.ad += 2;
  }
}

class Monster {
  constructor(stage) {
    this.hp = 100 + (stage - 1) * 5;
    this.ad = 2 + (stage - 1) * 3;
  }

  attack(player) {
    player.hp -= this.ad;
    return `${this.ad}의 데미지로 플레이어를 공격`;
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보, ${player.hp}, ${player.ad}`,
    ) +
    chalk.redBright(
      `| 몬스터 정보 |, ${monster.hp}, ${monster.ad}`,
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

    console.log(chalk.blue(
      `현재 ${turncount}턴, 플레이어 사이드 선택`,
    ))

    logs.forEach((log) => console.log(log));
    logs = [];

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 아무것도 하지않는다. 3. RUN`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    if (choice === "0") {
      console.log("프로그램 종료");
      process.exit(0);
    } else if (choice === "1") {
      logs.push(chalk.red(player.attack(monster)));
      if (monster.hp <= 0) {
        console.log(chalk.green("몬스터를 물리쳤습니다!"));
        return 1;
      } else {
        logs.push(chalk.red(monster.attack(player)));
      }
    } else if (choice === "2") {
      logs.push(chalk.red(`${choice}를 선택해 대기`))
      logs.push(chalk.red(monster.attack(player)));
    } else if (choice === "3") {
      logs.push(chalk.red(`${choice}을 선택해 도망`))
      return 2;
    } else {
      logs.push(chalk.red(`잘못된 선택입니다.`));
    }
    turncount++;
  }
  return 0;
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    const result = await battle(stage, player, monster);

    if (stage <= 10) {
      console.log(`${stage}를 클리어 했다`)
      readlineSync.question(chalk.yellowBright(`\n계속하려면 엔터를 누르세요...`));
    }

    // 스테이지 클리어 및 보상
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

    //게임 종료 조건
    if (stage === 10) {
      console.log(
        chalk.cyan(
          figlet.textSync('RL- Javascript CLEAR', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default'
          })
        )
      );
    }
  }
}