"# tworaveler_dummy"

// PC 처음 명령어
git init
git add --all
git commit -m "first commit"
git remote add origin https://github.com/HySu/tworaveler_dummy.git
git push -u origin master

// 소스 수정 후 명령어
git add .
git commit -m "xxx commit"
git push -u origin master

// aws : 처음
git clone https://github.com/HySu/tworaveler_dummy.git

// aws : 두번째부터
git pull https://github.com/HySu/tworaveler_dummy.git