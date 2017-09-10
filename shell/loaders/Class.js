Class = function Class(props, klass, body, args) {
  if (typeof klass != "function")
    klass = eval("(function "+ (klass||"Class") +"("+(args||"")+"){"+ (body||"") +"})");
  if (props) klass.prototype = props;
  return klass;
};

/* // Example
var Person = new Class(
{
  get name() (this.firstName||"") + " " + (this.lastName||""),
  set name(fullname) {
    fullname = fullname.split(" ");
    this.firstName = fullname[0];
    this.lastName = fullname[1];
    return this.name;
  },
  toString: function() this.name
},
  "Person",
  "this.firstName=first;\
   this.lastName=last;",
  "first, last"
)
*/
