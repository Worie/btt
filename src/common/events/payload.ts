export default function EventPayloadTemplate(passedData: Record<string, any>) {
  return `
  const http = require('http');

  const postData = JSON.stringify(${passedData.data});

  const options = {
    hostname: '${passedData.domain}',
    port: ${passedData.port},
    path: '/dynamic',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log(data);
    });
  });

  req.write(postData);
  req.end();
  `.replace(/\s\s/g, ' ');
}
