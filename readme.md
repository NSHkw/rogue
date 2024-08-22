## 도전 기능
1. 확률 로직 적용
- 각 기능들의 확률 로직이 정상적으로 동작
	행동 패턴- 공격, 방어, 도망 등
	유저 능력치 증가, 증가량 랜덤
	~~몬스터 공격력, 체력 증가량 랜덤~~ <span style="color:red">Monster constructor에 체력 증가량에 Math.floor(Math.random()) 추가</span>

2. 복잡한 행동 패턴 구현
- 플레이어 연속 공격이 확률에 의해 정상적으로 몬스터를 2회 공격
- 방어, 도망이 확률에 의해 정상 작동

3. 새로운 기능 구현
- 발제 문서에서 기획된 내용 이외 새로운 기능 추가

## 필수기능
1. 단순 행동패턴 (공격하기, 도망치기)
- ~~플레이어가 공격 시 몬스터 체력 감소~~ <span style="color:red">attack 함수 설정</span>
- ~~플레이어 도망치면 다음 스테이지 진행~~ <span style="color:red">RUN 눌렀을 때 LevelUp 없이 다음 스테이지 이동</span>
- 다른 행동 패턴 추가시 용이하게 확장성 고려해 개발

2. 플레이어 클래스에서 플레이어 스탯 (공격력, 체력 등), 공격 메소드 관리
- ~~플레이어 스탯을 클래스 속성으로 관리~~ <span style="color:red">클래스 constructor 안에 체력(hp)와 공격력(ad) 설정</span>
- ~~몬스터 스탯을 클래스 속성으로 관리~~ <span style="color:red">클래스 constructor 안에 체력(hp)와 공격력(ad) 설정 후 stage 매개변수 사용해 stage에 따라 증가</span>
- 클래스 메소드를 적절히 활용

3. 간단한 전투 로직 구현 (플레이어와 몬스터 공격, 피격)
- ~~유저의 입력 받아 전투 진행~~ <span style="color:red">if choice ~~ else if문 사용</span>
- ~~매 턴 전투기록 저장, 화면에 보여짐~~ <span style="color:red">turncount로 몇번째 턴인지 설정, console(chalk.blue)로 출력</span>
    - <span style="color: blue; font-weight:bold">몇번째 턴인지 알려주고, 얼마의 데미지를 받았는지를 화면으로 출력</span>

4. 스테이지 클리어 시 유저 체력 회복
- ~~특정 조건에 따라 스테이지 정상 종료 처리~~<span style="color:red">스테이지 종료시 스테이지 종료했다는 창 나오고 다음 스테이지 이동을 위해 enter키 클릭</span>
	- <span style="color: blue; font-weight:bold">특정 조건: 몬스터의 hp가 0이하가 되는 경우 or 도망(?), 그 이후에 스테이지 이동</span>
- ~~스테이지 정상적으로 끝나면 체력 회복, 몬스터 관련 이벤트 처리(몬스터 체력, 공격력 증가)~~ <span style="color:red">스테이지 종료 체력 원상복구 말고, 체력과 공격력 증가</span>