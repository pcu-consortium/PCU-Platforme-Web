################################################################################

TIMESTAMP_FILE  := .Dockerfile.flag
NETWORK_PREPROD := -p 9201:9200 -p 3001:3000 -p 27018:27017 -p 5003:5002
NETWORK_PROD    := -p 9200:9200 -p 3000:3000 -p 27017:27017 -p 5002:5002
PREPROD_DIR     := $$(pwd)/preprod-bases
LOG_FILE        := $$(pwd)/log

PROD_SHARE_OPTIONS :=                                     \
  -v $$(pwd)/..:/mnt/sources:ro                           \
  -v $$(pwd)/uploaded-files:/mnt/uploaded-files           \
  -v $$(pwd)/vignettes:/mnt/vignettes                     \
  -v $$(pwd)/mongo-base:/mnt/mongo-base                   \
  -v $$(pwd)/mongo-dumps:/mnt/mongo-dumps                 \
  -v $$(pwd)/Makefile.run:/root/Makefile:ro               \
  -v ~/.bash_history:/root/.bash_history

PREPROD_SHARE_OPTIONS :=                                  \
  -v $$(pwd)/..:/mnt/sources:ro                           \
  -v $(PREPROD_DIR)/uploaded-files:/mnt/uploaded-files    \
  -v $(PREPROD_DIR)/vignettes:/mnt/vignettes              \
  -v $(PREPROD_DIR)/mongo-base:/mnt/mongo-base            \
  -v $(PREPROD_DIR)/mongo-dumps:/mnt/mongo-dumps          \
  -v $$(pwd)/Makefile.run:/root/Makefile:ro

################################################################################

.PHONY: build-image
build-image: $(TIMESTAMP_FILE)

.PHONY: $(TIMESTAMP_FILE)
$(TIMESTAMP_FILE): Dockerfile
	@touch $(TIMESTAMP_FILE)
	docker build -t pcu . || ( rm $(TIMESTAMP_FILE); exit 1 )

################################################################################

.PHONY: top
top: build-image
	docker run -t -i -w /root $(NETWORK_PROD) $(PROD_SHARE_OPTIONS) pcu bash

################################################################################

.PHONY: back
back: build-image
	screen -d -m docker run $(NETWORK_PROD) $(PROD_SHARE_OPTIONS) pcu > $(LOG_FILE) 2>&1

.PHONY: kill
kill:
	@docker ps | grep -v 'CONTAINER ID' | cut -d' ' -f1 | while read id; do /bin/echo -n "Kill: "; docker kill $$id; done

################################################################################

.PHONY: preprod
preprod: build-image
	@set -x;                                                                                                                                                 \
	rm -Rf               $(PREPROD_DIR);                                                                                                                \
	mkdir -p             $(PREPROD_DIR);                                                                                                                \
	cp -a uploaded-files $(PREPROD_DIR)/;                                                                                                               \
	cp -a vignettes      $(PREPROD_DIR)/;                                                                                                               \
	cp -a mongo-base     $(PREPROD_DIR)/;                                                                                                               \
	cp -a mongo-dumps    $(PREPROD_DIR)/;                                                                                                               \
	docker kill pcu-deploying;                                                                                                                          \
	docker rm pcu-deploying;                                                                                                                            \
	bash -c "docker run $(NETWORK_PREPROD) $(PREPROD_SHARE_OPTIONS) --name pcu-deploying pcu | tee $(PREPROD_DIR)/log 2>&1" &                           \
	RUNNING_DOCKER_PID="$$!";                                                                                                                                \
	set +x;                                                                                                                                                  \
	while true; do                                                                                                                                           \
	  sleep 10;                                                                                                                                              \
	  if grep 'Listening at http://:::3000' $(PREPROD_DIR)/log; then break; fi;                                                                              \
	  if kill -0 "$${RUNNING_DOCKER_PID}"; then true; else exit 1; fi;                                                                                  \
	done

################################################################################

.PHONY: prod
prod:
	docker kill pcu-deploy;                                                                                                                             \
	docker rm pcu-deploy;                                                                                                                               \
	docker commit pcu-deploying pcu-deploy;                                                                                                             \
	screen -d -m bash -c "docker run -w /root $(NETWORK_PROD) $(PROD_SHARE_OPTIONS) --name pcu-deploy pcu-deploy make restart > $(LOG_FILE) 2>&1"

################################################################################

.PHONY: deploy
deploy:
	git pull
	$(MAKE) preprod
	$(MAKE) prod
	docker kill pcu-deploying
	docker rm pcu-deploying

################################################################################

.PHONY: dump-all
dump-all:
	docker exec pcu-deploy make dump-all

################################################################################

.PHONY: restore-bases
restore-bases: build-image
	docker kill pcu-deploy
	docker rm pcu-deploy
	screen -d -m bash -c "docker run -w /root $(NETWORK_PROD) $(PROD_SHARE_OPTIONS) --name pcu-deploy pcu-deploy make restore-mongo restart > $(LOG_FILE) 2>&1"

################################################################################

.PHONY: run-daemon
run-daemon:
	systemctl docker stop
	systemctl docker start --ip-masq=true -g /mnt/disk/.docker.img

################################################################################

.PHONY: clean-docker
clean-docker:
	@for x in $$(docker ps --no-trunc -aq); do docker rm $$x; done
	@for x in $$(docker images -q --filter dangling=true); do docker rmi $$x; done

################################################################################
