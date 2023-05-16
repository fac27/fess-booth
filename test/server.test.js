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