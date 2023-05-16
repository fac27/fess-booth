const test = require("node:test");
const assert = require("node:assert");
const { request } = require("./helpers.js");
const { sanitize } = require('../server.js');


//testing creating newe post 
test('should create a new post', async()=>{
    const postData = {
        title: 'Test post',
        body: 'This is a test post.'
      };
    
      const { status, body } = await request('/createPost', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' }
      });
    
      assert.strictEqual(status, 200);
      assert_attr(body, 'title', [postData.title], `Expected title to be '${postData.title}', but received:\n${body}`);
      assert_attr(body, 'body', [postData.body], `Expected body to be '${postData.body}', but received:\n${body}`);
})

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

//testing more complex sanitize function

test("Sanitize function", ()=>{
    const testString = "<>&\"'/`=!();+-";
    const sanitizedString = sanitize(testString);
    assert.equal(
        sanitizedString,
        "&amp&#x3B;lt&#x3B;&amp&#x3B;gt&#x3B;&amp&#x3B;&quot&#x3B;&#x27&#x3B;&#x2F&#x3B;&#x60&#x3B;&#x3D&#x3B;&#x21&#x3B;&#x28&#x3B;&#x29&#x3B;&#x3B;&#x2B;&#x2D;",
        `Expected sanitized string, but received:\n${sanitizedString}`
    );
});