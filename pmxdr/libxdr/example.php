<?php
header("Content-Type: text/xml");
header("Access-Control-Allow-Origin: *");
header("X-Foo: bar");
?>
<foo example="blah">
  <bar>
    <baz>
      <foobar some-attribute="this is an attribute"/>
    </baz>
  </bar>
</foo>
