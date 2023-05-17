const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");

//testing sanitization function 
test("POST with script tag sanitized", async()=>{
    const{status, body} = await request("/",{
        method: "POST",
        body: "",
        headers:{"content-type":""},
    });
    assert.equal(status, 200);
    assert.match(
        body,
        /&lt;script>alert\('uh oh'\)&lt;\/script>/i,
        `Expected <script> to have '<' replaced with '&lt;', but received:\n${body}`
    );
});

test("POST request with form data", async () => {
    const app = server.listen(9876);

    const { status, body } = await request("/", {
      method: "POST",
      body: "name=cc&message=hello",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  
    assert.equal(status, 200);
    assert.match(body, /cc/i);
    assert.match(body, /hello/i);
  });