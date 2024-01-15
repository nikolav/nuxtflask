# deploy setup

## pre.git-push
  - set `PRODUCTION=1`:1, `*_production` urls, @/flaskapi/.env
  - set `PRODUCTION$ = true`:2, `API_URL_production`:12, @/nuxtapp/config/vars.env.ts
  - set host @/scp-config.sh, lines 2-5

## deploy
  - @host: mkdir -p /root/app; cd /root/app; git clone _repository_
  - @home: . scp-config.sh
  - @host: . deploy-env.sh; . deploy.sh
