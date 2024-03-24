FROM desmart/node-next:18.18-9-alpine3.18

COPY .next/standalone /usr/src/app
COPY .next/static /usr/src/app/.next/static
COPY public /usr/src/app/public

ENV PORT 3000
ENV HOSTNAME 0.0.0.0
