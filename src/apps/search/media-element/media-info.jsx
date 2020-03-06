function cleanCampusName(name){
  // Remove Subject"..."@fr things
  return name.replace(/"Sujet \\"(.*)\\""@fr/g, "$1").replace(/^"(.*)"@fr$/, "$1").replace(/\\"/g, '"');
}

var line1 = function(doc){
  return cleanCampusName((doc.metadata && doc.metadata.label) || doc.title || doc.titre || doc.titrepropre || doc.reference || doc.label);
}

var line2 = function(doc){
  if (doc.metadata && doc.metadata.subTitle) return doc.metadata.subTitle;
  if (doc.legende) return doc.legende;
  else if (doc.refevenement) return doc.refevenement.join(", ");
  else if (doc.arboclass) return doc.arboclass;
  else return (doc.authors || []).join(", ");
}

var line3 = function(doc){
  if (doc.metadata && doc.metadata.mediaDuration) {
    let duration = doc.metadata.mediaDuration;
    if (doc.shortDescription) return <span><strong>{duration}</strong> - {doc.shortDescription}</span>;
    return <span><strong>{duration}</strong></span>;
  }
  return undefined;
}

var defaultImageUrl = function(doc){
  if (doc.thumbnail) return "/images/thumbnail_escom-aar.gif";
  return undefined;
}

var imageUrl = function(doc){
  if (doc.thumbnail) return doc.thumbnail;
  else if (doc.img) return img;
  else if (doc.exemplaire) return "/psa/api/exemplaires/" + doc.exemplaire + "/thumbnail";
  // else return "/images/psa_logo.png";
  else return "/images/thumbnail_escom-aar.gif";
}

var wmgUrl = function(doc){
  if (doc.thumbnail) return doc.thumbnail;
  else if (doc.img) return img;
  else if (doc.exemplaire) return "/psa/api/exemplaires/" + doc.exemplaire + "/image";
  else return "/images/thumbnail_escom-aar.gif";
}

module.exports = {
  line1, line2, line3, defaultImageUrl, imageUrl, wmgUrl
};
