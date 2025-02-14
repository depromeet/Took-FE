#!/bin/bash

ENV_FILE=".env"
ENV_KEY="LOCAL_HOST"
HOSTS_FILE="/etc/hosts"

# 환경 변수 파일이 없을 경우 에러 메시지 출력 후 종료
if [ ! -f "$ENV_FILE" ]; then
  echo "=====================   🚨 ERROR: NO ENV FILE   ====================="
  echo "                      환경 변수 파일이 없습니다."
  echo "               프로젝트 root에 $ENV_FILE 파일을 생성해주세요."
  echo "====================================================================="
  echo ""
  exit 1
fi

echo "> ✅ 환경 변수 파일 $ENV_FILE 를 감지했습니다."

# 환경 변수 파일에서 로컬 호스트 값 추출
LOCAL_HOST=$(grep ^"$ENV_KEY"= "$ENV_FILE" | cut -d '=' -f2)

# 환경 변수 파일에 로컬 호스트 값이 없을 경우 에러 메시지 출력 후 종료
if [ -z "$LOCAL_HOST" ]; then
  echo ""
  echo "================   🚨 ERROR: $ENV_KEY NOT DECLARED   =============="
  echo "   $ENV_FILE 파일에 $ENV_KEY 환경 변수를 생성하고 값을 설정해주세요."
  echo "====================================================================="
  echo ""
  exit 1
fi

echo "> ✅ 환경 변수 $ENV_KEY 가 $ENV_FILE 에 설정되어 있습니다. ($ENV_KEY=$LOCAL_HOST)"

# /etc/hosts 파일에 해당 로컬 호스트가 이미 있을 경우
if grep -q "$LOCAL_HOST" "$HOSTS_FILE"; then
  echo "> ✅ $HOSTS_FILE 에 $LOCAL_HOST 가 설정되어 있습니다."
else
# /etc/hosts 파일에 해당 로컬 호스트가 없을 경우 신규 추가
  echo ""
  echo "> 🔐 신규 로컬 호스트 [$LOCAL_HOST]를 $HOSTS_FILE 에 추가하기 위해 기기의 비밀번호(mac 비밀번호)를 입력하세요."
  echo "127.0.0.1\t$LOCAL_HOST" | sudo tee -a "$HOSTS_FILE" >/dev/null
  echo "> ✅ $HOSTS_FILE 에 신규 로컬 호스트 [$LOCAL_HOST]을 추가했습니다."
fi

# 로컬 호스트에 대한 https 인증서 생성
mkcert -key-file local-private-key.pem -cert-file local-certificate.pem "$LOCAL_HOST"