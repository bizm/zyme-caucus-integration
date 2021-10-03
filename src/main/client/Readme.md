# Front end

If you check `docker-compose.yml` for development environment you'll notice a workspace volume. That's where source code is copied and could be easily mounted to other docker containers as well as commited to or fetched from Git repository. So to build frontend side we simply do:

```shell
docker run -it --rm -v zyme-caucus_workspace:/workspace node:latest bash
cd /workspace/src/main/client
npm i

# if you want to watch changes and build them on the go:
npm run dev

# for production build
npm run build
```
