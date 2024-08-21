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
  }
}

class Monster {
  constructor() {
    this.hp = 100;
    this.ad = 2;
  }

  attack(player) {
    player.hp -= this.ad;
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

  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 아무것도 하지않는다.`,
      ),
    );
    const choice = readlineSync.question('당신의 선택은? ');

    // 플레이어의 선택에 따라 다음 행동 처리
    if (choice === "0") {
      console.log("프로그램 종료");
      process.exit(0);
    } else if (choice === "1") {
      logs.pop();
      logs.pop();
      logs.push(chalk.red(`플레이어가 ${choice}로 공격했다`));
      monster.hp = monster.hp - player.ad;
      logs.push(chalk.red(`몬스터가 공격했다`));
      player.hp = player.hp - monster.ad;
    } else if (choice === "2") {
      logs.pop();
      logs.pop();
      logs.push(chalk.red(`${choice}로 대기`))
      logs.push(chalk.red(`몬스터가 공격했다`));
      player.hp = player.hp - monster.ad;
    } else if (choice === "3") {
      logs.push(chalk.red(`${choice}로 도망`))
      break;
    }

    if (monster.hp <= 0) {
      console.log(chalk.green("몬스터를 물리쳤습니다!"));
      break;
    }
  }
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

};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 보상
    player.hp += 11;
    player.ad += 2;

    //게임 종료 조건

    stage++;
  }
}