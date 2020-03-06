
var lerp = function(t, t0, t1, v0, v1){
if (t0 == t1){
  return v0;
}
return v0 + (v1-v0) * (t-t0) / (t1-t0);
}

module.exports = {
	lerp
};
