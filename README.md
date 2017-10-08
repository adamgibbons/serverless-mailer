# serverless-mailer

Send email using Serverless and several AWS products (Lambda, SES, API Gateway).

## Install and setup

Clone the Github repo:
```bash
git clone git@github.com:adamgibbons/serverless-mailer.git
```

Change into the project's directory and install dependencies
```bash
cd serverless-mailer && npm install
```

Rename `config.copy.json` to `config.json`.
```bash
mv config.copy.json config.json
```

Open `config.json` and add your AWS credentials for the `accessKeyId` and `secretAccessKey` fields.
*Note - this file won't be tracked by Git or published to Github.*

## Deploy and use

Deploy to serverless:
```bash
sls deploy -v
```

Once the package has deployed, Serverless will write log information to the terminal,
including a POST endpoint.
Send a POST request to that endpoint with a JSON body.

Full request body structure:
```json
{
  "bccEmailAddresses": ["foo@example.com"],
  "ccEmailAddresses": ["bar@example.com"],
  "toEmailAddresses": ["baz@example.com"],
  "bodyData": "...and email goes here!",
  "bodyCharset": "UTF-8",
  "subjectdata": "Subject goes here",
  "subjectCharset": "UTF-8",
  "sourceEmail": "baz@example.com",
  "replyToAddresses": ["baz@example.com"]
}
```

Curl example:

```bash
curl -d '{"toEmailAddresses":["recipient@example.com"], "subjectdata":"bar", "sourceEmail":"sam.morse@example.com", "bodyData":"What hath God wrought?"}' -H "Content-Type: application/json" -X POST https://<replace-with-your-endpoint>.execute-api.us-east-1.amazonaws.com/dev/send
```
