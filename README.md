# deploy setup

## pre.git-push
  - set host @/scp-config.sh, lines 2-5

## deploy
  - @host: mkdir -p /root/app; cd /root/app; git clone _repository_
  - @home: . scp-config.sh
  - @host: . deploy-env.sh; . deploy.sh