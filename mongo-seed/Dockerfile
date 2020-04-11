FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db videodb --collection videos --type json --file /init.json --jsonArray