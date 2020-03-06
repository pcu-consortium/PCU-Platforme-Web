var bases = {
  "ADVERTORIAL": {
    "id": "ADVERTORIAL",
    "label": "ADVERTORIAL",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "nomrubrique",
        "label": {
          "fra": "Nom de rubrique",
          "eng": "Name of heading"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "nomoperation",
        "label": {
          "fra": "Nom de l'opération",
          "eng": "Operation name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "docassociescg",
        "label": {
          "fra": "Documents associés",
          "eng": "Associated documents"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      },
      {
        "id": "createdate",
        "label": {
          "eng": "CreatedOn",
          "fra": "Crééle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "createtime",
        "label": {
          "eng": "Time",
          "fra": "Heure"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 602
      },
      {
        "id": "modificationdate",
        "label": {
          "eng": "ModifiedOn",
          "fra": "Modifiéle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 603
      },
      {
        "id": "modificationtime",
        "label": {
          "eng": "Modtime",
          "fra": "Heuremodif"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 604
      },
      {
        "id": "author",
        "label": {
          "eng": "Author",
          "fra": "Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 605
      },
      {
        "id": "title",
        "label": {
          "eng": "Title",
          "fra": "Titre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "keywords",
        "label": {
          "eng": "Keywords",
          "fra": "Motsclés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "subject",
        "label": {
          "eng": "Subject",
          "fra": "Sujet"
        },
        "type": "text",
        "multivalued": false,
        "pos": 608
      },
      {
        "id": "nofchars",
        "label": {
          "eng": "Characters",
          "fra": "Caractères"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 609
      },
      {
        "id": "nofpages",
        "label": {
          "eng": "Pages",
          "fra": "Pages"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 610
      },
      {
        "id": "nofwords",
        "label": {
          "eng": "Words",
          "fra": "Mots"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 611
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nomstrat",
          "nomcampagne",
          "nomrubrique",
          "nomoperation",
          "docassociescg"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "createdate",
          "createtime",
          "modificationdate",
          "modificationtime",
          "author",
          "title",
          "keywords",
          "subject",
          "nofchars",
          "nofpages",
          "nofwords"
        ]
      }
    ]
  },
  "AFFICHAGE": {
    "id": "AFFICHAGE",
    "label": "AFFICHAGE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "typaffichage",
        "label": {
          "fra": "Type d'affichage",
          "eng": "Billboard type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 203
      },
      {
        "id": "typphoto",
        "label": {
          "fra": "Type de photo",
          "eng": "Photo type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "nomaffichage",
        "label": {
          "fra": "Nom de l'affichage",
          "eng": "Billboard name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "docassociesprint",
        "label": {
          "fra": "Documents associés",
          "eng": "Associated documents"
        },
        "type": "text",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "affichagcouleur",
        "label": {
          "fra": "Couleur",
          "eng": "Colors"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nomstrat",
          "nomcampagne",
          "typaffichage",
          "typphoto",
          "nomaffichage",
          "docassociesprint",
          "affichagcouleur"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "ANNUAIRE": {
    "id": "ANNUAIRE",
    "label": "ANNUAIRE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "contacttyp",
        "label": {
          "fra": "Type de contact",
          "eng": "Type de contact"
        },
        "type": "text",
        "multivalued": true,
        "pos": 101
      },
      {
        "id": "contactinterne",
        "label": {
          "fra": "Contact interne",
          "eng": "Contact interne"
        },
        "type": "text",
        "multivalued": false,
        "pos": 102
      },
      {
        "id": "contactnom",
        "label": {
          "fra": "Nom",
          "eng": "Nom"
        },
        "type": "text",
        "multivalued": true,
        "pos": 103
      },
      {
        "id": "contactprenom",
        "label": {
          "fra": "Prénom",
          "eng": "Prénom"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "contactsociete",
        "label": {
          "fra": "Société - Agence",
          "eng": "Société - Agence"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "contactadresse",
        "label": {
          "fra": "Adresse",
          "eng": "Adresse"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "contactcodepostal",
        "label": {
          "fra": "Code postal",
          "eng": "Code postal"
        },
        "type": "text",
        "multivalued": false,
        "pos": 107
      },
      {
        "id": "contactville",
        "label": {
          "fra": "Ville",
          "eng": "Ville"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "contactpays",
        "label": {
          "fra": "Pays",
          "eng": "Pays"
        },
        "type": "text",
        "multivalued": true,
        "pos": 109
      },
      {
        "id": "contacttel",
        "label": {
          "fra": "Téléphone",
          "eng": "Téléphone"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "contactportab",
        "label": {
          "fra": "Portable",
          "eng": "Portable"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "contactfax",
        "label": {
          "fra": "Fax",
          "eng": "Fax"
        },
        "type": "text",
        "multivalued": false,
        "pos": 112
      },
      {
        "id": "contactemail",
        "label": {
          "fra": "Email",
          "eng": "Email"
        },
        "type": "text",
        "multivalued": false,
        "pos": 113
      },
      {
        "id": "contactcommentaire",
        "label": {
          "fra": "Commentaire",
          "eng": "Commentaire"
        },
        "type": "text",
        "multivalued": false,
        "pos": 114
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "contacttyp",
          "contactinterne",
          "contactnom",
          "contactprenom",
          "contactsociete",
          "contactadresse",
          "contactcodepostal",
          "contactville",
          "contactpays",
          "contacttel",
          "contactportab",
          "contactfax",
          "contactemail",
          "contactcommentaire"
        ]
      }
    ]
  },
  "BUM": {
    "id": "BUM",
    "label": "BUM",
    "fields": [
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "bumobjectif",
        "label": {
          "fra": "Objectifs du support",
          "eng": "Rationale behind the DVD"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "bumremise",
        "label": {
          "fra": "Quand remettre ce support",
          "eng": "When to present the DVD"
        },
        "type": "text",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "bumcontenu",
        "label": {
          "fra": "Que contient ce support",
          "eng": "DVD contents"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "bumadaptation",
        "label": {
          "fra": "Comment adapter ce support",
          "eng": "How do I tailor the support for my home market"
        },
        "type": "text",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "date_exacte",
          "reference",
          "cdate",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "bumobjectif",
          "bumremise",
          "bumcontenu",
          "bumadaptation"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "CAMPAGNE": {
    "id": "CAMPAGNE",
    "label": "CAMPAGNE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la statégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "nomcampagn",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "fra": "Nom de produit ou véhicule",
          "eng": "Name of product or vehicle"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "fra": "Silhouette",
          "eng": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "typcampagn",
        "label": {
          "fra": "Type de campagne",
          "eng": "Campaign type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "descriptcampagn",
        "label": {
          "fra": "Description de la campagne",
          "eng": "Campaign description"
        },
        "type": "text",
        "multivalued": false,
        "pos": 107
      },
      {
        "id": "actionprojet",
        "label": {
          "fra": "Action",
          "eng": "Action"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "createcampagn",
        "label": {
          "fra": "Création",
          "eng": "Creation"
        },
        "type": "text",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "budgetcampagne",
        "label": {
          "fra": "Budget",
          "eng": "Budget"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "datparutioncampagn",
        "label": {
          "fra": "Date de 1ere parution antenne",
          "eng": "First publication antenna"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "datdispocampagn",
        "label": {
          "fra": "Date de mise à disposition des pays",
          "eng": "Provision date of the countries"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "briefagencecampagne",
        "label": {
          "fra": "Date 1er brief agence",
          "eng": "Agency 1st brief date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "supportscampagn",
        "label": {
          "fra": "Supports de la campagne",
          "eng": "Advertising materials"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "marchecampagn",
        "label": {
          "fra": "Marché",
          "eng": "Target"
        },
        "type": "text",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "droitscampagne",
        "label": {
          "fra": "Droits liés à la campagne",
          "eng": "Campaign rights"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "arboclass",
          "nomstrat",
          "nomcampagn",
          "typvehiculeproduit",
          "silhouette",
          "typcampagn",
          "descriptcampagn"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "actionprojet",
          "createcampagn",
          "budgetcampagne",
          "datparutioncampagn",
          "datdispocampagn",
          "briefagencecampagne",
          "supportscampagn",
          "marchecampagn",
          "droitscampagne"
        ]
      }
    ]
  },
  "CATALOGUE": {
    "id": "CATALOGUE",
    "label": "CATALOGUE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "pays",
        "label": {
          "fra": "Pays",
          "eng": "Country"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "typcatalogphoto",
        "label": {
          "fra": "Type de catalogue",
          "eng": "Catalogue type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "sujetcatalog",
        "label": {
          "fra": "Sujet du catalogue",
          "eng": "Catalogue subject"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "refcatalogue",
        "label": {
          "fra": "Référence du catalogue",
          "eng": "Catalogue reference"
        },
        "type": "text",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "reftariffrance",
        "label": {
          "fra": "Tarif de référence (France)",
          "eng": "Tariff of reference (France)"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "provenancecatalog",
        "label": {
          "fra": "Provenance du catalogue",
          "eng": "Catalogue source"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "datedition",
        "label": {
          "fra": "Date d'édition",
          "eng": "Edition date"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "datreedition",
        "label": {
          "fra": "Date de 1ère édition (si réédition)",
          "eng": "First edition date (if republication)"
        },
        "type": "text",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "nombrepages",
        "label": {
          "fra": "Nombre de pages (couverture incluse)",
          "eng": "Number of pages (cover included)"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "formatcatalog",
        "label": {
          "fra": "Format du catalogue",
          "eng": "Catalogue format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 210
      },
      {
        "id": "faconnagecatalog",
        "label": {
          "fra": "Façonnage du catalogue",
          "eng": "Catalogue shaping"
        },
        "type": "text",
        "multivalued": false,
        "pos": 211
      },
      {
        "id": "photograveur",
        "label": {
          "fra": "Photograveur",
          "eng": "Photoengraver"
        },
        "type": "text",
        "multivalued": true,
        "pos": 212
      },
      {
        "id": "imprimeur",
        "label": {
          "fra": "Imprimeur plate forme d'édition",
          "eng": "Printer catalogue platform"
        },
        "type": "text",
        "multivalued": true,
        "pos": 213
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      },
      {
        "id": "createdate",
        "label": {
          "eng": "CreatedOn",
          "fra": "Crééle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "createtime",
        "label": {
          "eng": "Time",
          "fra": "Heure"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 602
      },
      {
        "id": "modificationdate",
        "label": {
          "eng": "ModifiedOn",
          "fra": "Modifiéle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 603
      },
      {
        "id": "modificationtime",
        "label": {
          "eng": "Modtime",
          "fra": "Heuremodif"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 604
      },
      {
        "id": "author",
        "label": {
          "eng": "Author",
          "fra": "Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 605
      },
      {
        "id": "title",
        "label": {
          "eng": "Title",
          "fra": "Titre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "keywords",
        "label": {
          "eng": "Keywords",
          "fra": "Motsclés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "subject",
        "label": {
          "eng": "Subject",
          "fra": "Sujet"
        },
        "type": "text",
        "multivalued": false,
        "pos": 608
      },
      {
        "id": "nofchars",
        "label": {
          "eng": "Characters",
          "fra": "Caractères"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 609
      },
      {
        "id": "nofpages",
        "label": {
          "eng": "Pages",
          "fra": "Pages"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 610
      },
      {
        "id": "nofwords",
        "label": {
          "eng": "Words",
          "fra": "Mots"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 611
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "pays",
          "typcatalogphoto",
          "sujetcatalog",
          "refcatalogue",
          "reftariffrance",
          "provenancecatalog",
          "datedition",
          "datreedition",
          "nombrepages",
          "formatcatalog",
          "faconnagecatalog",
          "photograveur",
          "imprimeur"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "createdate",
          "createtime",
          "modificationdate",
          "modificationtime",
          "author",
          "title",
          "keywords",
          "subject",
          "nofchars",
          "nofpages",
          "nofwords"
        ]
      }
    ]
  },
  "CLIENT": {
    "id": "CLIENT",
    "label": "CLIENT",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "mcp",
        "label": "mcpid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 23
      },
      {
        "id": "mck",
        "label": "mckid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 24
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "clientid",
        "label": {
          "fra": "clientid"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "client",
        "label": {
          "fra": "client"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "nom",
        "label": {
          "fra": "nom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "prenom",
        "label": {
          "fra": "prenom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 104
      },
      {
        "id": "agence",
        "label": {
          "fra": "agence"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "adresse",
        "label": {
          "fra": "adresse"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "codpos",
        "label": {
          "fra": "codpos"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "ville",
        "label": {
          "fra": "ville"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "pays",
        "label": {
          "fra": "pays"
        },
        "type": "text",
        "multivalued": true,
        "pos": 109
      },
      {
        "id": "telephone",
        "label": {
          "fra": "telephone"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "portable",
        "label": {
          "fra": "portable"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "fax",
        "label": {
          "fra": "fax"
        },
        "type": "text",
        "multivalued": false,
        "pos": 112
      },
      {
        "id": "email",
        "label": {
          "fra": "email"
        },
        "type": "text",
        "multivalued": false,
        "pos": 113
      },
      {
        "id": "naissance",
        "label": {
          "fra": "naissance"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 114
      },
      {
        "id": "origine",
        "label": {
          "eng": "Origine client",
          "fra": "Origine client"
        },
        "type": "text",
        "multivalued": true,
        "pos": 115
      },
      {
        "id": "civilite",
        "label": {
          "fra": "civilite"
        },
        "type": "text",
        "multivalued": false,
        "pos": 116
      },
      {
        "id": "languecom",
        "label": {
          "eng": "Langue communication",
          "fra": "Langue communication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 117
      },
      {
        "id": "fonction",
        "label": {
          "fra": "fonction"
        },
        "type": "text",
        "multivalued": false,
        "pos": 118
      },
      {
        "id": "service",
        "label": {
          "fra": "service"
        },
        "type": "text",
        "multivalued": false,
        "pos": 119
      },
      {
        "id": "formattelechargement",
        "label": {
          "eng": "Format de téléchargement",
          "fra": "Format de téléchargement"
        },
        "type": "text",
        "multivalued": true,
        "pos": 120
      },
      {
        "id": "wfluxrss",
        "label": {
          "eng": "Flux RSS",
          "fra": "Flux RSS"
        },
        "type": "text",
        "multivalued": true,
        "pos": 121
      },
      {
        "id": "wtypeaffichage",
        "label": {
          "eng": "Type affichage",
          "fra": "Type affichage"
        },
        "type": "text",
        "multivalued": true,
        "pos": 122
      },
      {
        "id": "wnbimagesbypage",
        "label": {
          "eng": "Nombre d'images par page",
          "fra": "Nombre d'images par page"
        },
        "type": "text",
        "multivalued": true,
        "pos": 123
      },
      {
        "id": "wtri",
        "label": {
          "eng": "Tri",
          "fra": "Tri"
        },
        "type": "text",
        "multivalued": true,
        "pos": 124
      },
      {
        "id": "nom1",
        "label": {
          "fra": "Nom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "entiteint",
        "label": {
          "eng": "Entité interne",
          "fra": "Entité interne"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "prenom1",
        "label": {
          "fra": "Prénom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "serviceint",
        "label": {
          "eng": "Service interne",
          "fra": "Service interne"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "agence1",
        "label": {
          "fra": "Agence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "serviceintautre",
        "label": {
          "eng": "Service interne autres",
          "fra": "Service interne autres"
        },
        "type": "text",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "adresse1",
        "label": {
          "fra": "Adresse"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "fonctionint",
        "label": {
          "eng": "Fonction interne",
          "fra": "Fonction interne"
        },
        "type": "text",
        "multivalued": true,
        "pos": 208
      },
      {
        "id": "codpos1",
        "label": {
          "fra": "Code postal"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "fonctionintcom",
        "label": {
          "eng": "Fonction interne communication",
          "fra": "Fonction interne communication"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 210
      },
      {
        "id": "ville1",
        "label": {
          "fra": "Ville"
        },
        "type": "text",
        "multivalued": false,
        "pos": 211
      },
      {
        "id": "pays1",
        "label": {
          "fra": "Pays"
        },
        "type": "text",
        "multivalued": false,
        "pos": 212
      },
      {
        "id": "telephone1",
        "label": {
          "fra": "Téléphone"
        },
        "type": "text",
        "multivalued": false,
        "pos": 213
      },
      {
        "id": "portable1",
        "label": {
          "fra": "Portable"
        },
        "type": "text",
        "multivalued": false,
        "pos": 214
      },
      {
        "id": "fax1",
        "label": {
          "fra": "Fax"
        },
        "type": "text",
        "multivalued": false,
        "pos": 215
      },
      {
        "id": "email1",
        "label": {
          "fra": "Email"
        },
        "type": "text",
        "multivalued": false,
        "pos": 216
      },
      {
        "id": "civilite1",
        "label": {
          "fra": "Civilité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 217
      },
      {
        "id": "fonction1",
        "label": {
          "fra": "Fonction"
        },
        "type": "text",
        "multivalued": false,
        "pos": 218
      },
      {
        "id": "service1",
        "label": {
          "fra": "Service"
        },
        "type": "text",
        "multivalued": false,
        "pos": 219
      },
      {
        "id": "commentaires1",
        "label": {
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 220
      },
      {
        "id": "nom2",
        "label": {
          "fra": "Nom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 301
      },
      {
        "id": "prenom2",
        "label": {
          "fra": "Prénom"
        },
        "type": "text",
        "multivalued": false,
        "pos": 302
      },
      {
        "id": "agence2",
        "label": {
          "fra": "Agence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 303
      },
      {
        "id": "adresse2",
        "label": {
          "fra": "Adresse"
        },
        "type": "text",
        "multivalued": false,
        "pos": 304
      },
      {
        "id": "nominterloc",
        "label": {
          "eng": "Nom interlocuteur Michelin",
          "fra": "Nom interlocuteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 305
      },
      {
        "id": "codpos2",
        "label": {
          "fra": "Code postal"
        },
        "type": "text",
        "multivalued": false,
        "pos": 306
      },
      {
        "id": "prenominterloc",
        "label": {
          "eng": "Prénom interlocuteur Michelin",
          "fra": "Prénom interlocuteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "ville2",
        "label": {
          "fra": "Ville"
        },
        "type": "text",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "emailinterloc",
        "label": {
          "eng": "Email interlocuteur Michelin",
          "fra": "Email interlocuteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "pays2",
        "label": {
          "fra": "Pays"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "telephoneinterloc",
        "label": {
          "eng": "Téléphone interlocuteur Michelin",
          "fra": "Téléphone interlocuteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 311
      },
      {
        "id": "telephone2",
        "label": {
          "fra": "Téléphone"
        },
        "type": "text",
        "multivalued": false,
        "pos": 312
      },
      {
        "id": "portable2",
        "label": {
          "fra": "Portable"
        },
        "type": "text",
        "multivalued": false,
        "pos": 313
      },
      {
        "id": "fax2",
        "label": {
          "fra": "Fax"
        },
        "type": "text",
        "multivalued": false,
        "pos": 314
      },
      {
        "id": "email2",
        "label": {
          "fra": "Email"
        },
        "type": "text",
        "multivalued": false,
        "pos": 315
      },
      {
        "id": "civilite2",
        "label": {
          "fra": "Civilite"
        },
        "type": "text",
        "multivalued": false,
        "pos": 316
      },
      {
        "id": "fonction2",
        "label": {
          "fra": "Fonction"
        },
        "type": "text",
        "multivalued": false,
        "pos": 317
      },
      {
        "id": "service2",
        "label": {
          "fra": "Service"
        },
        "type": "text",
        "multivalued": false,
        "pos": 318
      },
      {
        "id": "commentaires2",
        "label": {
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 319
      },
      {
        "id": "typefact",
        "label": {
          "fra": "Type facture"
        },
        "type": "text",
        "multivalued": false,
        "pos": 320
      },
      {
        "id": "typeadresse",
        "label": {
          "fra": "Type adresse"
        },
        "type": "text",
        "multivalued": false,
        "pos": 321
      },
      {
        "id": "wsitename",
        "label": {
          "fra": "Nom du site",
          "eng": "Nom du site"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "wuserid",
        "label": {
          "fra": "N° utilisateur",
          "eng": "N° utilisateur"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 502
      },
      {
        "id": "wusercode",
        "label": {
          "fra": "Code SSO",
          "eng": "Code SSO"
        },
        "type": "text",
        "multivalued": false,
        "pos": 503
      },
      {
        "id": "wusername",
        "label": {
          "fra": "Login",
          "eng": "Login"
        },
        "type": "text",
        "multivalued": false,
        "pos": 504
      },
      {
        "id": "wuserpassword",
        "label": {
          "fra": "Mot de passe",
          "eng": "Mot de passe"
        },
        "type": "text",
        "multivalued": false,
        "pos": 505
      },
      {
        "id": "wuserlibelle",
        "label": {
          "fra": "Libellé utilisateur",
          "eng": "Libellé utilisateur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "wprofilename",
        "label": {
          "fra": "Profil utilisateur",
          "eng": "Profil utilisateur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "wuserdatestart",
        "label": {
          "fra": "Date début validité",
          "eng": "Date début validité"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 508
      },
      {
        "id": "wuserdatestop",
        "label": {
          "fra": "Date fin validité",
          "eng": "Date fin validité"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 509
      },
      {
        "id": "wisadministrator",
        "label": {
          "fra": "Administrateur",
          "eng": "Administrateur"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 510
      },
      {
        "id": "wusertype",
        "label": {
          "fra": "Type utilisateur",
          "eng": "Type utilisateur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 511
      },
      {
        "id": "wuserlanguage",
        "label": {
          "fra": "Langue",
          "eng": "Langue"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "wdatabase",
        "label": {
          "fra": "Fonds de consultation",
          "eng": "Fonds de consultation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 513
      },
      {
        "id": "wdatabaseadmin",
        "label": {
          "fra": "Fonds administrés",
          "eng": "Fonds administrés"
        },
        "type": "text",
        "multivalued": true,
        "pos": 514
      },
      {
        "id": "wuseremail",
        "label": {
          "fra": "Email",
          "eng": "Email"
        },
        "type": "text",
        "multivalued": false,
        "pos": 515
      },
      {
        "id": "csusername",
        "label": {
          "fra": "Nom client serveur",
          "eng": "Client server name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 601
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "mcp",
          "mck",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "clientid",
          "client",
          "nom",
          "prenom",
          "agence",
          "adresse",
          "codpos",
          "ville",
          "pays",
          "telephone",
          "portable",
          "fax",
          "email",
          "naissance",
          "origine",
          "civilite",
          "languecom",
          "fonction",
          "service",
          "formattelechargement",
          "wfluxrss",
          "wtypeaffichage",
          "wnbimagesbypage",
          "wtri"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nom1",
          "entiteint",
          "prenom1",
          "serviceint",
          "agence1",
          "serviceintautre",
          "adresse1",
          "fonctionint",
          "codpos1",
          "fonctionintcom",
          "ville1",
          "pays1",
          "telephone1",
          "portable1",
          "fax1",
          "email1",
          "civilite1",
          "fonction1",
          "service1",
          "commentaires1"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "nom2",
          "prenom2",
          "agence2",
          "adresse2",
          "nominterloc",
          "codpos2",
          "prenominterloc",
          "ville2",
          "emailinterloc",
          "pays2",
          "telephoneinterloc",
          "telephone2",
          "portable2",
          "fax2",
          "email2",
          "civilite2",
          "fonction2",
          "service2",
          "commentaires2",
          "typefact",
          "typeadresse"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "wsitename",
          "wuserid",
          "wusercode",
          "wusername",
          "wuserpassword",
          "wuserlibelle",
          "wprofilename",
          "wuserdatestart",
          "wuserdatestop",
          "wisadministrator",
          "wusertype",
          "wuserlanguage",
          "wdatabase",
          "wdatabaseadmin",
          "wuseremail"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "csusername"
        ]
      }
    ]
  },
  "CLIENTBASE": {
    "id": "CLIENTBASE",
    "label": "CLIENTBASE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "database",
        "label": {
          "eng": "Nom de la base",
          "fra": "Fonds"
        },
        "type": "text",
        "multivalued": true,
        "pos": 101
      },
      {
        "id": "userdatestart",
        "label": {
          "eng": "Date de début de connection base",
          "fra": "Date de début validité"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 102
      },
      {
        "id": "userdateend",
        "label": {
          "eng": "Date de fin de connection base",
          "fra": "Date de fin de validité"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typedaction",
        "label": {
          "fra": "Type d'action",
          "eng": "Type d'action"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Format de téléchargement"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "typecommande",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 106
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "database",
          "userdatestart",
          "userdateend",
          "typedaction",
          "formattelechargement",
          "typecommande"
        ]
      }
    ]
  },
  "DOCCOM": {
    "id": "DOCCOM",
    "label": "DOCCOM",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 203
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 210
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 401
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 402
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 403
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 404
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 405
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 406
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 407
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 408
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 409
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 410
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 411
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 412
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 413
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "nomstrat",
          "nomcampagne",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 5,
        "label": "Onglet 5",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "DOCUMENT": {
    "id": "DOCUMENT",
    "label": "DOCUMENT",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 203
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 210
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 301
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 306
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 308
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 309
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 310
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 311
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 312
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 313
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "nomstrat",
          "nomcampagne"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "DROITS": {
    "id": "DROITS",
    "label": "DROITS",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires BO"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "typedroits",
        "label": {
          "fra": "Type de droits",
          "eng": "Rights type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 101
      },
      {
        "id": "observgeneraledroits",
        "label": {
          "eng": "General observations on the rights",
          "fra": "Observations générales sur les droits"
        },
        "type": "text",
        "multivalued": false,
        "pos": 102
      },
      {
        "id": "couvgeo",
        "label": {
          "eng": "Geographic coverage",
          "fra": "Zone géographique"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "paysexclus",
        "label": {
          "fra": "Pays exclus",
          "eng": "Excluded contries"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "datdebutdroits",
        "label": {
          "eng": "Beginning of the rights",
          "fra": "Date de début des droits"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 105
      },
      {
        "id": "datfindroits",
        "label": {
          "eng": "Dead line of the rights",
          "fra": "Date de fin des droits"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "dureedroits",
        "label": {
          "eng": "Duration of the rights",
          "fra": "Durée des droits"
        },
        "type": "text",
        "multivalued": false,
        "pos": 107
      },
      {
        "id": "droitsechus",
        "label": {
          "eng": "Droitsechus",
          "fra": "Droits échus"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "supportscouv",
        "label": {
          "eng": "Covered supports",
          "fra": "Supports couverts"
        },
        "type": "text",
        "multivalued": true,
        "pos": 109
      },
      {
        "id": "supportscouvexclu",
        "label": {
          "fra": "Supports couverts exclus",
          "eng": "Supports couverts exclus"
        },
        "type": "text",
        "multivalued": true,
        "pos": 110
      },
      {
        "id": "droitsgerepar",
        "label": {
          "eng": "Rights managed by",
          "fra": "Droits gérés par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 111
      },
      {
        "id": "nomauteur",
        "label": {
          "eng": "Author name/photographer - having rights",
          "fra": "Nom prénom"
        },
        "type": "text",
        "multivalued": true,
        "pos": 112
      },
      {
        "id": "contratauteur",
        "label": {
          "eng": "Author contract",
          "fra": "Contrat"
        },
        "type": "text",
        "multivalued": false,
        "pos": 113
      },
      {
        "id": "fichierdroit",
        "label": {
          "eng": "Rights file",
          "fra": "Fichier des Droits"
        },
        "type": "text",
        "multivalued": false,
        "pos": 114
      },
      {
        "id": "formatkinescop",
        "label": {
          "fra": "Format kinescopé",
          "eng": "Format kinescopé"
        },
        "type": "text",
        "multivalued": true,
        "pos": 115
      },
      {
        "id": "montantdroit",
        "label": {
          "fra": "Montant des droits négociés",
          "eng": "Negotiated rights"
        },
        "type": "text",
        "multivalued": false,
        "pos": 116
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "typedroits",
          "observgeneraledroits",
          "couvgeo",
          "paysexclus",
          "datdebutdroits",
          "datfindroits",
          "dureedroits",
          "droitsechus",
          "supportscouv",
          "supportscouvexclu",
          "droitsgerepar",
          "nomauteur",
          "contratauteur",
          "fichierdroit",
          "formatkinescop",
          "montantdroit"
        ]
      }
    ]
  },
  "EDITIONS": {
    "id": "EDITIONS",
    "label": "EDITIONS",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomedition",
        "label": {
          "fra": "Nom de l'édition",
          "eng": "Edition name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "typedition",
        "label": {
          "fra": "Type d'édition",
          "eng": "Edition type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "numedidition",
        "label": {
          "fra": "Numéro d'édition",
          "eng": "Edition number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "annedition",
        "label": {
          "fra": "Année d'édition",
          "eng": "Edition Year"
        },
        "type": "text",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "moisedition",
        "label": {
          "fra": "Mois d'édition",
          "eng": "Edition Month"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "sommaireedition",
        "label": {
          "fra": "Sommaire- noms des articles",
          "eng": "Synopsis"
        },
        "type": "text",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "chemindefer",
        "label": {
          "fra": "Chemin de fer",
          "eng": "Railroad"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "prix",
        "label": {
          "fra": "Prix",
          "eng": "Price"
        },
        "type": "text",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "notejointe",
        "label": {
          "fra": "Note jointe (fichier)",
          "eng": "Note jointe (fichier)"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      },
      {
        "id": "createdate",
        "label": {
          "eng": "CreatedOn",
          "fra": "Crééle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "createtime",
        "label": {
          "eng": "Time",
          "fra": "Heure"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 602
      },
      {
        "id": "modificationdate",
        "label": {
          "eng": "ModifiedOn",
          "fra": "Modifiéle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 603
      },
      {
        "id": "modificationtime",
        "label": {
          "eng": "Modtime",
          "fra": "Heuremodif"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 604
      },
      {
        "id": "author",
        "label": {
          "eng": "Author",
          "fra": "Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 605
      },
      {
        "id": "title",
        "label": {
          "eng": "Title",
          "fra": "Titre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "keywords",
        "label": {
          "eng": "Keywords",
          "fra": "Motsclés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "subject",
        "label": {
          "eng": "Subject",
          "fra": "Sujet"
        },
        "type": "text",
        "multivalued": false,
        "pos": 608
      },
      {
        "id": "nofchars",
        "label": {
          "eng": "Characters",
          "fra": "Caractères"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 609
      },
      {
        "id": "nofpages",
        "label": {
          "eng": "Pages",
          "fra": "Pages"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 610
      },
      {
        "id": "nofwords",
        "label": {
          "eng": "Words",
          "fra": "Mots"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 611
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nomedition",
          "typedition",
          "numedidition",
          "annedition",
          "moisedition",
          "sommaireedition",
          "chemindefer",
          "prix",
          "notejointe"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "createdate",
          "createtime",
          "modificationdate",
          "modificationtime",
          "author",
          "title",
          "keywords",
          "subject",
          "nofchars",
          "nofpages",
          "nofwords"
        ]
      }
    ]
  },
  "IMAGE": {
    "id": "IMAGE",
    "label": "IMAGE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "fra": "Silhouette",
          "eng": "Body style"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "mc",
        "label": {
          "fra": "Mots clés",
          "eng": "Keywords"
        },
        "type": "text",
        "multivalued": true,
        "pos": 109
      },
      {
        "id": "roue",
        "label": {
          "fra": "Roues",
          "eng": "Wheel"
        },
        "type": "text",
        "multivalued": true,
        "pos": 110
      },
      {
        "id": "garnissage",
        "label": {
          "fra": "Garnissages",
          "eng": "Trim"
        },
        "type": "text",
        "multivalued": true,
        "pos": 111
      },
      {
        "id": "typphoto",
        "label": {
          "fra": "Type de photo",
          "eng": "Type de photo"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "environpdv",
        "label": {
          "eng": "Environnement of photography",
          "fra": "Environnement de prise de vue"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "nivfinition",
        "label": {
          "fra": "Niveau de finition",
          "eng": "Spec level"
        },
        "type": "text",
        "multivalued": true,
        "pos": 203
      },
      {
        "id": "teintecaisse",
        "label": {
          "fra": "Teinte de caisse",
          "eng": "Body color"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "lieupdv",
        "label": {
          "fra": "Lieu de prise de vue",
          "eng": "Lieu de prise de vue"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "datepdv",
        "label": {
          "fra": "Date de prise de vue",
          "eng": "Date of sight"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "anglepdv",
        "label": {
          "fra": "Angle de prise de vue",
          "eng": "Angle of sight"
        },
        "type": "text",
        "multivalued": true,
        "pos": 207
      },
      {
        "id": "legende",
        "label": {
          "fra": "Légende",
          "eng": "Caption"
        },
        "type": "text",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "refpiece",
        "label": {
          "fra": "Référence de la pièce",
          "eng": "Référence de la pièce"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "orientation",
        "label": {
          "fra": "Orientation",
          "eng": "Orientation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 210
      },
      {
        "id": "modecolorim",
        "label": {
          "fra": "Mode colorimétrique",
          "eng": "File color mode"
        },
        "type": "text",
        "multivalued": true,
        "pos": 211
      },
      {
        "id": "arboniv3",
        "label": {
          "fra": "3ème niveau d'arborescence",
          "eng": "3ème niveau d'arborescence"
        },
        "type": "text",
        "multivalued": true,
        "pos": 212
      },
      {
        "id": "standardenr",
        "label": {
          "fra": "Standard d'enregistrement",
          "eng": "File format"
        },
        "type": "text",
        "multivalued": false,
        "pos": 213
      },
      {
        "id": "poidsorigine",
        "label": {
          "fra": "Poids des fichiers d'origine non compressés",
          "eng": "Uncompressed original file size"
        },
        "type": "number",
        "subtype": "float",
        "multivalued": false,
        "pos": 214
      },
      {
        "id": "formatekta",
        "label": {
          "fra": "Format d'ekta",
          "eng": "Format d'ekta"
        },
        "type": "text",
        "multivalued": false,
        "pos": 215
      },
      {
        "id": "editionorigine",
        "label": {
          "fra": "Edition d'origine",
          "eng": "Original publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 216
      },
      {
        "id": "familleproduitsimage",
        "label": {
          "fra": "Famille Produits Image",
          "eng": "Famille Produits Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 217
      },
      {
        "id": "copyright",
        "label": {
          "fra": "Copyright",
          "eng": "Copyright"
        },
        "type": "text",
        "multivalued": false,
        "pos": 218
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 401
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 402
      },
      {
        "id": "seo",
        "label": {
          "fra": "SEO",
          "eng": "SEO"
        },
        "type": "text",
        "multivalued": false,
        "pos": 403
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 404
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Declared use"
        },
        "type": "text",
        "multivalued": true,
        "pos": 405
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 406
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 407
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 408
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 409
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 410
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 411
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 602
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 603
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 604
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 605
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 608
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 609
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 610
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 611
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 612
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 613
      },
      {
        "id": "exifimagetype",
        "label": {
          "fra": "Type image",
          "eng": "Image type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 701
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 702
      },
      {
        "id": "exifdiskmem",
        "label": {
          "fra": "Taille mémoire",
          "eng": "Memory size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 703
      },
      {
        "id": "exiforientation",
        "label": {
          "fra": "Orientation Image",
          "eng": "Image Orientation"
        },
        "type": "text",
        "multivalued": false,
        "pos": 704
      },
      {
        "id": "exifdpi",
        "label": {
          "fra": "DPI",
          "eng": "DPI"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 705
      },
      {
        "id": "exifwidth",
        "label": {
          "fra": "Largeur Pixels",
          "eng": "Pixel Width"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 706
      },
      {
        "id": "exifheight",
        "label": {
          "fra": "Hauteur Pixels",
          "eng": "Pixel Height"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 707
      },
      {
        "id": "exifcolortype",
        "label": {
          "fra": "Espace Colorimétrique",
          "eng": "Color Type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 708
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "mc",
          "roue",
          "garnissage"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "typphoto",
          "environpdv",
          "nivfinition",
          "teintecaisse",
          "lieupdv",
          "datepdv",
          "anglepdv",
          "legende",
          "refpiece",
          "orientation",
          "modecolorim",
          "arboniv3",
          "standardenr",
          "poidsorigine",
          "formatekta",
          "editionorigine",
          "familleproduitsimage",
          "copyright"
        ]
      },
      {
        "id": 5,
        "label": "Onglet 5",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "seo",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 8,
        "label": "Onglet 8",
        "fields": [
          "exifimagetype",
          "exifdisksize",
          "exifdiskmem",
          "exiforientation",
          "exifdpi",
          "exifwidth",
          "exifheight",
          "exifcolortype"
        ]
      }
    ]
  },
  "Loan": {
    "id": "Loan",
    "label": "Loan",
    "fields": [
      {
        "id": "orderdate",
        "label": {
          "fra": "Orderdate"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 1000
      },
      {
        "id": "expdate",
        "label": "DateRetour",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 1001
      },
      {
        "id": "retdate",
        "label": "Effectif",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 1002
      },
      {
        "id": "nature",
        "label": "TypeSortie",
        "type": "text",
        "multivalued": true,
        "pos": 1003
      },
      {
        "id": "utilisation",
        "label": {
          "fra": "Utilisation",
          "eng": "Usage"
        },
        "type": "text",
        "multivalued": false,
        "pos": 1004
      },
      {
        "id": "client",
        "label": {
          "fra": "Client",
          "eng": "Client"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1005
      },
      {
        "id": "appartenance",
        "label": "Groupe",
        "type": "text",
        "multivalued": false,
        "pos": 1006
      }
    ],
    "tabs": [
      {
        "id": 11,
        "label": "Onglet 11",
        "fields": [
          "orderdate",
          "expdate",
          "retdate",
          "nature",
          "utilisation",
          "client",
          "appartenance"
        ]
      }
    ]
  },
  "MD": {
    "id": "MD",
    "label": "MD",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "nomoperation",
        "label": {
          "fra": "Nom de l'opération",
          "eng": "Operation name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "typcampaign",
        "label": {
          "fra": "Type de campagne",
          "eng": "Type of Campaign"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "periodmd",
        "label": {
          "fra": "Durée de la campagne",
          "eng": "Period / Duration"
        },
        "type": "text",
        "multivalued": false,
        "pos": 205
      },
      {
        "id": "objectivemd",
        "label": {
          "fra": "Objectifs",
          "eng": "Objective"
        },
        "type": "text",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "targetmd",
        "label": {
          "fra": "Marché",
          "eng": "Market"
        },
        "type": "text",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "strategymd",
        "label": {
          "fra": "Stratégie",
          "eng": "Strategy"
        },
        "type": "text",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "creativechoicemd",
        "label": {
          "fra": "Choix créatif",
          "eng": "Creative Choice"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "mecanisme",
        "label": {
          "fra": "Mécanisme",
          "eng": "Mechanism"
        },
        "type": "text",
        "multivalued": false,
        "pos": 210
      },
      {
        "id": "emphasizeditems",
        "label": {
          "fra": "Mise en valeur",
          "eng": "Emphasized items"
        },
        "type": "text",
        "multivalued": false,
        "pos": 211
      },
      {
        "id": "mediasmd",
        "label": {
          "fra": "Médias",
          "eng": "Medias"
        },
        "type": "text",
        "multivalued": false,
        "pos": 212
      },
      {
        "id": "mailingdescription",
        "label": {
          "fra": "Description du mailling",
          "eng": "Mailing description"
        },
        "type": "text",
        "multivalued": false,
        "pos": 213
      },
      {
        "id": "visualsorigin",
        "label": {
          "fra": "Origine des visuels",
          "eng": "Visuals origin"
        },
        "type": "text",
        "multivalued": false,
        "pos": 214
      },
      {
        "id": "evaluationresults",
        "label": {
          "fra": "Résultats",
          "eng": "Evaluation / Results"
        },
        "type": "text",
        "multivalued": false,
        "pos": 215
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nomstrat",
          "nomcampagne",
          "nomoperation",
          "typcampaign",
          "periodmd",
          "objectivemd",
          "targetmd",
          "strategymd",
          "creativechoicemd",
          "mecanisme",
          "emphasizeditems",
          "mediasmd",
          "mailingdescription",
          "visualsorigin",
          "evaluationresults"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "PEL": {
    "id": "PEL",
    "label": "PEL",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "Date de création"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "Date de modification"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomdispopel",
        "label": {
          "fra": "Nom du dispositif",
          "eng": "Nom du dispositif"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "nomdossierpel",
        "label": {
          "fra": "Nom du dossier",
          "eng": "Nom du dossier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "visualisationpel",
        "label": {
          "fra": "Où visualiser un exemple",
          "eng": "Où visualiser un exemple"
        },
        "type": "text",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "listezippel",
        "label": {
          "fra": "liste des fichiers zippés",
          "eng": "liste des fichiers zippés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "auteurpel",
        "label": {
          "fra": "Nom de l'Auteur",
          "eng": "Nom de l'Auteur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "idauteurpel",
        "label": {
          "fra": "Identifiant Auteur",
          "eng": "Identifiant Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 206
      },
      {
        "id": "fichedispopel",
        "label": {
          "fra": "Fiche de référence du dispositif",
          "eng": "Fiche de référence du dispositif"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "poidsorigine",
        "label": {
          "eng": "Poids du fichier",
          "fra": "Poids du fichier en Ko"
        },
        "type": "number",
        "subtype": "float",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 304
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 305
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 306
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 308
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 309
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "nomdispopel",
          "nomdossierpel",
          "visualisationpel",
          "listezippel",
          "auteurpel",
          "idauteurpel",
          "fichedispopel",
          "poidsorigine"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "PLV": {
    "id": "PLV",
    "label": "PLV",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "nomplv",
        "label": {
          "fra": "Nom de la PLV",
          "eng": "PLV name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 112
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 201
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 202
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 203
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 204
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 207
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 208
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 210
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 401
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 402
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 403
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 404
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 405
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 406
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 407
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 408
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 409
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 410
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 411
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 412
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 413
      },
      {
        "id": "createdate",
        "label": {
          "eng": "CreatedOn",
          "fra": "Crééle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "createtime",
        "label": {
          "eng": "Time",
          "fra": "Heure"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 502
      },
      {
        "id": "modificationdate",
        "label": {
          "eng": "ModifiedOn",
          "fra": "Modifiéle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 503
      },
      {
        "id": "modificationtime",
        "label": {
          "eng": "Modtime",
          "fra": "Heuremodif"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 504
      },
      {
        "id": "author",
        "label": {
          "eng": "Author",
          "fra": "Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 505
      },
      {
        "id": "title",
        "label": {
          "eng": "Title",
          "fra": "Titre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "keywords",
        "label": {
          "eng": "Keywords",
          "fra": "Motsclés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "subject",
        "label": {
          "eng": "Subject",
          "fra": "Sujet"
        },
        "type": "text",
        "multivalued": false,
        "pos": 508
      },
      {
        "id": "nofchars",
        "label": {
          "eng": "Characters",
          "fra": "Caractères"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 509
      },
      {
        "id": "nofpages",
        "label": {
          "eng": "Pages",
          "fra": "Pages"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 510
      },
      {
        "id": "nofwords",
        "label": {
          "eng": "Words",
          "fra": "Mots"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 511
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "nomstrat",
          "nomcampagne",
          "nomplv",
          "exifdisksize"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 5,
        "label": "Onglet 5",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "createdate",
          "createtime",
          "modificationdate",
          "modificationtime",
          "author",
          "title",
          "keywords",
          "subject",
          "nofchars",
          "nofpages",
          "nofwords"
        ]
      }
    ]
  },
  "PRESSINFO": {
    "id": "PRESSINFO",
    "label": "PRESSINFO",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "planclassementpresse",
        "label": {
          "eng": "Plande classement presse",
          "fra": "Plan de classement pressepro"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "publication",
        "label": {
          "fra": "Publication sur pressepro",
          "eng": "Publication sur pressepro"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "datmisligne",
        "label": {
          "fra": "Date de mise en ligne pressepro",
          "eng": "Date de mise en ligne pressepro"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "heuremisenligne",
        "label": {
          "eng": "Heure de mise en ligne",
          "fra": "Heure de mise en ligne pressepro"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "refevenement",
        "label": {
          "fra": "Référence de l'événement",
          "eng": "Event reference"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "typevenement",
        "label": {
          "fra": "Type d'évènement",
          "eng": "Type d'évènement"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "rubpresspro",
        "label": {
          "fra": "Rubrique pressePro",
          "eng": "Pressepro heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 207
      },
      {
        "id": "sousrubpresspro",
        "label": {
          "fra": "Sous rubrique pressePro",
          "eng": "Pressepro under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 208
      },
      {
        "id": "datparutiondoc",
        "label": {
          "fra": "Date de parution du document",
          "eng": "Document publication date"
        },
        "type": "text",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "produitnoncommercial",
        "label": {
          "fra": "Produit non commercialisé",
          "eng": "Not marketed product"
        },
        "type": "text",
        "multivalued": true,
        "pos": 210
      },
      {
        "id": "annee",
        "label": {
          "fra": "Année",
          "eng": "Year"
        },
        "type": "text",
        "multivalued": false,
        "pos": 211
      },
      {
        "id": "standardenregistreminfo",
        "label": {
          "fra": "Standard d'enregistrement info",
          "eng": "Document recording standard"
        },
        "type": "text",
        "multivalued": false,
        "pos": 212
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 401
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 402
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 403
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 404
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 405
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 406
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 407
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 408
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 409
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 410
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 602
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 603
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 604
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 605
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 608
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 609
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 610
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 611
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 612
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 613
      },
      {
        "id": "createdate",
        "label": {
          "eng": "CreatedOn",
          "fra": "Crééle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 701
      },
      {
        "id": "createtime",
        "label": {
          "eng": "Time",
          "fra": "Heure"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 702
      },
      {
        "id": "modificationdate",
        "label": {
          "eng": "ModifiedOn",
          "fra": "Modifiéle"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 703
      },
      {
        "id": "modificationtime",
        "label": {
          "eng": "Modtime",
          "fra": "Heuremodif"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 704
      },
      {
        "id": "author",
        "label": {
          "eng": "Author",
          "fra": "Auteur"
        },
        "type": "text",
        "multivalued": false,
        "pos": 705
      },
      {
        "id": "title",
        "label": {
          "eng": "Title",
          "fra": "Titre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 706
      },
      {
        "id": "keywords",
        "label": {
          "eng": "Keywords",
          "fra": "Motsclés"
        },
        "type": "text",
        "multivalued": false,
        "pos": 707
      },
      {
        "id": "subject",
        "label": {
          "eng": "Subject",
          "fra": "Sujet"
        },
        "type": "text",
        "multivalued": false,
        "pos": 708
      },
      {
        "id": "nofchars",
        "label": {
          "eng": "Characters",
          "fra": "Caractères"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 709
      },
      {
        "id": "nofpages",
        "label": {
          "eng": "Pages",
          "fra": "Pages"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 710
      },
      {
        "id": "nofwords",
        "label": {
          "eng": "Words",
          "fra": "Mots"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 711
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "planclassementpresse",
          "publication",
          "datmisligne",
          "heuremisenligne",
          "refevenement",
          "typevenement",
          "rubpresspro",
          "sousrubpresspro",
          "datparutiondoc",
          "produitnoncommercial",
          "annee",
          "standardenregistreminfo"
        ]
      },
      {
        "id": 5,
        "label": "Onglet 5",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 8,
        "label": "Onglet 8",
        "fields": [
          "createdate",
          "createtime",
          "modificationdate",
          "modificationtime",
          "author",
          "title",
          "keywords",
          "subject",
          "nofchars",
          "nofpages",
          "nofwords"
        ]
      }
    ]
  },
  "PRESSPHOTO": {
    "id": "PRESSPHOTO",
    "label": "PRESSPHOTO",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 103
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 104
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 105
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "mc",
        "label": {
          "fra": "Mots clés",
          "eng": "Keywords"
        },
        "type": "text",
        "multivalued": true,
        "pos": 109
      },
      {
        "id": "planclassementpresse",
        "label": {
          "eng": "Plande classement presse",
          "fra": "Plan de classement pressepro"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "publication",
        "label": {
          "fra": "Publication sur pressepro",
          "eng": "Publication sur pressepro"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "datmisligne",
        "label": {
          "fra": "Date de mise en ligne pressepro",
          "eng": "On-line publishing date on Pressepro"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "heuremisenligne",
        "label": {
          "fra": "Heure de mise en ligne pressepro",
          "eng": "Heure de mise en ligne pressepro"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "familleimage",
        "label": {
          "fra": "Famille image",
          "eng": "Image family"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "refevenement",
        "label": {
          "fra": "Référence de l'événement",
          "eng": "Event reference"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "typevenement",
        "label": {
          "fra": "Type d'événement",
          "eng": "Event type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 207
      },
      {
        "id": "produitnoncommercial",
        "label": {
          "fra": "Produit non commercialisé",
          "eng": "Not marketed product"
        },
        "type": "text",
        "multivalued": true,
        "pos": 208
      },
      {
        "id": "nivfinition",
        "label": {
          "fra": "Niveau de finition",
          "eng": "Finition level"
        },
        "type": "text",
        "multivalued": true,
        "pos": 209
      },
      {
        "id": "teintecaisse",
        "label": {
          "fra": "Teinte de caisse",
          "eng": "Body color"
        },
        "type": "text",
        "multivalued": true,
        "pos": 210
      },
      {
        "id": "environpdv",
        "label": {
          "fra": "Environnement de prise de vue",
          "eng": "Environment of photography"
        },
        "type": "text",
        "multivalued": true,
        "pos": 211
      },
      {
        "id": "anglepdv",
        "label": {
          "fra": "Angle de prise de vue",
          "eng": "Angle of photography"
        },
        "type": "text",
        "multivalued": true,
        "pos": 212
      },
      {
        "id": "datepdv",
        "label": {
          "fra": "Date de prise de vue",
          "eng": "Date of photography"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 213
      },
      {
        "id": "lieupdv",
        "label": {
          "fra": "Lieu de prise de vue",
          "eng": "Location of photography"
        },
        "type": "text",
        "multivalued": true,
        "pos": 214
      },
      {
        "id": "modecolorim",
        "label": {
          "fra": "Mode colorimétrique",
          "eng": "File Colour Mode"
        },
        "type": "text",
        "multivalued": true,
        "pos": 215
      },
      {
        "id": "copyright",
        "label": {
          "fra": "Copyright",
          "eng": "Copyright"
        },
        "type": "text",
        "multivalued": true,
        "pos": 216
      },
      {
        "id": "annee",
        "label": {
          "fra": "Année",
          "eng": "Year"
        },
        "type": "text",
        "multivalued": false,
        "pos": 217
      },
      {
        "id": "standardenr",
        "label": {
          "eng": "Photo recording standard",
          "fra": "Standard d'enregistrement"
        },
        "type": "text",
        "multivalued": false,
        "pos": 218
      },
      {
        "id": "datparutionphoto",
        "label": {
          "fra": "Date de parution de la photo",
          "eng": "Photo publication date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 219
      },
      {
        "id": "sousrubpresspro",
        "label": {
          "fra": "Sous rubrique pressePro",
          "eng": "Pressepro under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 220
      },
      {
        "id": "rubpresspro",
        "label": {
          "fra": "Rubrique pressePro",
          "eng": "Pressepro heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 221
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 401
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 402
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 403
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 404
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 405
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 406
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 407
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 408
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 409
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 410
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 602
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 603
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 604
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 605
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 608
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 609
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 610
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 611
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 612
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 613
      },
      {
        "id": "exifimagetype",
        "label": {
          "fra": "Type image",
          "eng": "Image type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 701
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 702
      },
      {
        "id": "exifdiskmem",
        "label": {
          "fra": "Taille mémoire",
          "eng": "Memory size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 703
      },
      {
        "id": "exiforientation",
        "label": {
          "fra": "Orientation Image",
          "eng": "Image Orientation"
        },
        "type": "text",
        "multivalued": false,
        "pos": 704
      },
      {
        "id": "exifdpi",
        "label": {
          "fra": "DPI",
          "eng": "DPI"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 705
      },
      {
        "id": "exifwidth",
        "label": {
          "fra": "Largeur Pixels",
          "eng": "Pixel Width"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 706
      },
      {
        "id": "exifheight",
        "label": {
          "fra": "Hauteur Pixels",
          "eng": "Pixel Height"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 707
      },
      {
        "id": "exifcolortype",
        "label": {
          "fra": "Espace Colorimétrique",
          "eng": "Color Type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 708
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "titredoc",
          "typdoc",
          "typrub",
          "sousrub",
          "mc"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "planclassementpresse",
          "publication",
          "datmisligne",
          "heuremisenligne",
          "familleimage",
          "refevenement",
          "typevenement",
          "produitnoncommercial",
          "nivfinition",
          "teintecaisse",
          "environpdv",
          "anglepdv",
          "datepdv",
          "lieupdv",
          "modecolorim",
          "copyright",
          "annee",
          "standardenr",
          "datparutionphoto",
          "sousrubpresspro",
          "rubpresspro"
        ]
      },
      {
        "id": 5,
        "label": "Onglet 5",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 8,
        "label": "Onglet 8",
        "fields": [
          "exifimagetype",
          "exifdisksize",
          "exifdiskmem",
          "exiforientation",
          "exifdpi",
          "exifwidth",
          "exifheight",
          "exifcolortype"
        ]
      }
    ]
  },
  "PRESSVIDEO": {
    "id": "PRESSVIDEO",
    "label": "PRESSVIDEO",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "planclassementpresse",
        "label": {
          "eng": "Plande classement presse",
          "fra": "Plan de classement pressepro"
        },
        "type": "text",
        "multivalued": false,
        "pos": 201
      },
      {
        "id": "publication",
        "label": {
          "fra": "Publication sur pressepro",
          "eng": "Publication sur pressepro"
        },
        "type": "boolean",
        "multivalued": false,
        "pos": 202
      },
      {
        "id": "datmisligne",
        "label": {
          "fra": "Date de mise en ligne pressepro",
          "eng": "On-line publishing date on Pressepro"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 203
      },
      {
        "id": "heuremisenligne",
        "label": {
          "fra": "Heure de mise en ligne presspro",
          "eng": "Heure de mise en ligne presspro"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 204
      },
      {
        "id": "refevenement",
        "label": {
          "fra": "Référence de l'événement",
          "eng": "Event reference"
        },
        "type": "text",
        "multivalued": true,
        "pos": 205
      },
      {
        "id": "typevenement",
        "label": {
          "fra": "Type d'évènement",
          "eng": "Event type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 206
      },
      {
        "id": "rubpresspro",
        "label": {
          "fra": "Rubrique pressePro",
          "eng": "Pressepro heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 207
      },
      {
        "id": "sousrubpresspro",
        "label": {
          "fra": "Sous rubrique pressePro",
          "eng": "Pressepro under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 208
      },
      {
        "id": "dateparutionvideo",
        "label": {
          "fra": "Date de parution de la vidéo",
          "eng": "Video Publication date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 209
      },
      {
        "id": "typvideo",
        "label": {
          "fra": "Type de vidéo",
          "eng": "Video type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 210
      },
      {
        "id": "produitnoncommercial",
        "label": {
          "fra": "Produit non commercialisé",
          "eng": "Not marketed product"
        },
        "type": "text",
        "multivalued": true,
        "pos": 211
      },
      {
        "id": "ratio",
        "label": {
          "fra": "Ratio",
          "eng": "Ratio"
        },
        "type": "text",
        "multivalued": true,
        "pos": 212
      },
      {
        "id": "annee",
        "label": {
          "fra": "Année",
          "eng": "Year"
        },
        "type": "text",
        "multivalued": false,
        "pos": 213
      },
      {
        "id": "refarchivaudiovisuelle",
        "label": {
          "fra": "Référence archive audiovisuelle",
          "eng": "Reference audiovisual archives"
        },
        "type": "text",
        "multivalued": false,
        "pos": 214
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 501
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 506
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 508
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 509
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 510
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 701
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 702
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 703
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 704
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 705
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 706
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 707
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 708
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 709
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 710
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 711
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 712
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 713
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub"
        ]
      },
      {
        "id": 3,
        "label": "Onglet 3",
        "fields": [
          "planclassementpresse",
          "publication",
          "datmisligne",
          "heuremisenligne",
          "refevenement",
          "typevenement",
          "rubpresspro",
          "sousrubpresspro",
          "dateparutionvideo",
          "typvideo",
          "produitnoncommercial",
          "ratio",
          "annee",
          "refarchivaudiovisuelle"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 8,
        "label": "Onglet 8",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  },
  "SOUND": {
    "id": "SOUND",
    "label": "SOUND",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "typmedia",
        "label": {
          "fra": "Type de média",
          "eng": "Media type"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "docassociescg",
        "label": {
          "fra": "Documents associés",
          "eng": "Associated documents"
        },
        "type": "text",
        "multivalued": false,
        "pos": 112
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      },
      {
        "id": "artist",
        "label": {
          "fra": "Artiste",
          "eng": "Artist"
        },
        "type": "text",
        "multivalued": false,
        "pos": 601
      },
      {
        "id": "title",
        "label": {
          "fra": "Titre",
          "eng": "Title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 602
      },
      {
        "id": "genre",
        "label": {
          "fra": "Genre",
          "eng": "Genre"
        },
        "type": "text",
        "multivalued": false,
        "pos": 603
      },
      {
        "id": "yearrecorded",
        "label": {
          "fra": "AnnéeEnreg",
          "eng": "YearRecorded"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 604
      },
      {
        "id": "album",
        "label": {
          "fra": "Album",
          "eng": "Album"
        },
        "type": "text",
        "multivalued": false,
        "pos": 605
      },
      {
        "id": "http",
        "label": {
          "fra": "LienWeb",
          "eng": "WebLink"
        },
        "type": "text",
        "multivalued": false,
        "pos": 606
      },
      {
        "id": "playtime",
        "label": {
          "fra": "Durée",
          "eng": "Playtime"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 607
      },
      {
        "id": "tracknumber",
        "label": {
          "fra": "Piste",
          "eng": "Track Number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 608
      },
      {
        "id": "bitrate",
        "label": {
          "fra": "Bauds",
          "eng": "Bit rate"
        },
        "type": "text",
        "multivalued": false,
        "pos": 609
      },
      {
        "id": "filesize",
        "label": {
          "fra": "Taille fichier",
          "eng": "File size"
        },
        "type": "text",
        "multivalued": false,
        "pos": 610
      },
      {
        "id": "frequency",
        "label": {
          "fra": "Fréquence",
          "eng": "Frequency"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 611
      },
      {
        "id": "numberofframes",
        "label": {
          "fra": "numberofframes",
          "eng": "numberofframes"
        },
        "type": "text",
        "multivalued": false,
        "pos": 612
      },
      {
        "id": "mode",
        "label": {
          "fra": "Mode",
          "eng": "Mode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 613
      },
      {
        "id": "mpegversion",
        "label": {
          "fra": "Mpeg version",
          "eng": "Mpeg version"
        },
        "type": "text",
        "multivalued": false,
        "pos": 614
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "nomstrat",
          "nomcampagne",
          "typmedia",
          "docassociescg"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      },
      {
        "id": 7,
        "label": "Onglet 7",
        "fields": [
          "artist",
          "title",
          "genre",
          "yearrecorded",
          "album",
          "http",
          "playtime",
          "tracknumber",
          "bitrate",
          "filesize",
          "frequency",
          "numberofframes",
          "mode",
          "mpegversion"
        ]
      }
    ]
  },
  "STRATEGIE": {
    "id": "STRATEGIE",
    "label": "STRATEGIE",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la statégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "fra": "Nom de produit ou véhicule",
          "eng": "Name of product or vehicle"
        },
        "type": "text",
        "multivalued": true,
        "pos": 103
      },
      {
        "id": "silhouette",
        "label": {
          "fra": "Silhouette",
          "eng": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "createstrat",
        "label": {
          "fra": "Création",
          "eng": "Creation"
        },
        "type": "text",
        "multivalued": false,
        "pos": 105
      },
      {
        "id": "budgetstrat",
        "label": {
          "fra": "Budget",
          "eng": "Budget"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "datparutionstrat",
        "label": {
          "fra": "Date de 1ere parution antenne",
          "eng": "First publication antenna"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 107
      },
      {
        "id": "datdispostrat",
        "label": {
          "fra": "Date de mise à disposition des pays",
          "eng": "Provision date of the countries"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 108
      },
      {
        "id": "briefagencestrat",
        "label": {
          "fra": "Date 1er brief agence",
          "eng": "Agency 1st brief date"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "descriptionstrat",
        "label": {
          "fra": "Description du projet",
          "eng": "Project description"
        },
        "type": "text",
        "multivalued": false,
        "pos": 110
      },
      {
        "id": "identitevisuelstrat",
        "label": {
          "fra": "Identité visuelle",
          "eng": "Visual identity"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "planningstrat",
        "label": {
          "fra": "Planning de lancement",
          "eng": "Planning of launching"
        },
        "type": "text",
        "multivalued": false,
        "pos": 112
      },
      {
        "id": "dossierpresssstrat",
        "label": {
          "fra": "Dossier de presse",
          "eng": "Press kit"
        },
        "type": "text",
        "multivalued": false,
        "pos": 113
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "arboclass",
          "nomstrat",
          "typvehiculeproduit",
          "silhouette",
          "createstrat",
          "budgetstrat",
          "datparutionstrat",
          "datdispostrat",
          "briefagencestrat",
          "descriptionstrat",
          "identitevisuelstrat",
          "planningstrat",
          "dossierpresssstrat"
        ]
      }
    ]
  },
  "UniPlan": {
    "id": "UniPlan",
    "label": "UniPlan",
    "fields": [
      {
        "id": "pid",
        "label": "Pid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "mctid",
        "label": "Mctid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1000
      },
      {
        "id": "word",
        "label": "Term",
        "type": "text",
        "multivalued": true,
        "pos": 1001
      },
      {
        "id": "level",
        "label": "Level",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1002
      },
      {
        "id": "parentword",
        "label": "Parentword",
        "type": "text",
        "multivalued": false,
        "pos": 1003
      },
      {
        "id": "nbmc",
        "label": "Nbmc",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1004
      },
      {
        "id": "comment",
        "label": {
          "fra": "Commentaires",
          "eng": "Comment"
        },
        "type": "text",
        "multivalued": false,
        "pos": 1005
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "pid"
        ]
      },
      {
        "id": 11,
        "label": "Onglet 11",
        "fields": [
          "mctid",
          "word",
          "level",
          "parentword",
          "nbmc",
          "comment"
        ]
      }
    ]
  },
  "UniThesaurus": {
    "id": "UniThesaurus",
    "label": "UniThesaurus",
    "fields": [
      {
        "id": "pid",
        "label": "Pid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "mctid",
        "label": "Mctid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1000
      },
      {
        "id": "word",
        "label": {
          "fra": "Terme",
          "eng": "Term"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1001
      },
      {
        "id": "level",
        "label": "Level",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1002
      },
      {
        "id": "parentword",
        "label": "ParentWord",
        "type": "text",
        "multivalued": false,
        "pos": 1003
      },
      {
        "id": "termid",
        "label": "Termid",
        "type": "text",
        "multivalued": false,
        "pos": 1004
      },
      {
        "id": "shortcut",
        "label": {
          "fra": "Raccourci",
          "eng": "ShortCut"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1005
      },
      {
        "id": "shortcutid",
        "label": "Shortcutid",
        "type": "text",
        "multivalued": false,
        "pos": 1006
      },
      {
        "id": "use",
        "label": {
          "fra": "Utiliser",
          "eng": "Use"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1007
      },
      {
        "id": "useid",
        "label": "Useid",
        "type": "text",
        "multivalued": false,
        "pos": 1008
      },
      {
        "id": "usefor",
        "label": {
          "fra": "UtiliserPour",
          "eng": "UseFor"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1009
      },
      {
        "id": "useforid",
        "label": "Useforid",
        "type": "text",
        "multivalued": false,
        "pos": 1010
      },
      {
        "id": "seealso",
        "label": {
          "fra": "VoirAussi",
          "eng": "SeeAlso"
        },
        "type": "text",
        "multivalued": true,
        "pos": 1011
      },
      {
        "id": "seealsoid",
        "label": "Seealsoid",
        "type": "text",
        "multivalued": false,
        "pos": 1012
      },
      {
        "id": "nbmc",
        "label": "Nbmc",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1013
      },
      {
        "id": "comment",
        "label": {
          "fra": "Commentaires",
          "eng": "Comment"
        },
        "type": "text",
        "multivalued": false,
        "pos": 1014
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "pid"
        ]
      },
      {
        "id": 11,
        "label": "Onglet 11",
        "fields": [
          "mctid",
          "word",
          "level",
          "parentword",
          "termid",
          "shortcut",
          "shortcutid",
          "use",
          "useid",
          "usefor",
          "useforid",
          "seealso",
          "seealsoid",
          "nbmc",
          "comment"
        ]
      }
    ]
  },
  "UniXML": {
    "id": "UniXML",
    "label": "UniXML",
    "fields": [
      {
        "id": "pid",
        "label": "Pid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "mctid",
        "label": "Mctid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1000
      },
      {
        "id": "word",
        "label": "Term",
        "type": "text",
        "multivalued": true,
        "pos": 1001
      },
      {
        "id": "level",
        "label": "Level",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1002
      },
      {
        "id": "parentword",
        "label": "Parentword",
        "type": "text",
        "multivalued": false,
        "pos": 1003
      },
      {
        "id": "comment",
        "label": {
          "fra": "Commentaires",
          "eng": "Comment"
        },
        "type": "text",
        "multivalued": false,
        "pos": 1005
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "pid"
        ]
      },
      {
        "id": 11,
        "label": "Onglet 11",
        "fields": [
          "mctid",
          "word",
          "level",
          "parentword",
          "comment"
        ]
      }
    ]
  },
  "VIDEO": {
    "id": "VIDEO",
    "label": "VIDEO",
    "fields": [
      {
        "id": "docid",
        "label": "docid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 1
      },
      {
        "id": "date_exacte",
        "label": {
          "eng": "CreationDate",
          "fra": "CrééLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 2
      },
      {
        "id": "commentaires",
        "label": {
          "eng": "Comments",
          "fra": "Commentaires"
        },
        "type": "text",
        "multivalued": false,
        "pos": 3
      },
      {
        "id": "exemplaire",
        "label": "Exemplaire",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 4
      },
      {
        "id": "cliche",
        "label": {
          "eng": "File",
          "fra": "Fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 5
      },
      {
        "id": "mdate",
        "label": {
          "eng": "RecordDate",
          "fra": "EnregistréLe"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 6
      },
      {
        "id": "createdby",
        "label": {
          "eng": "Creator",
          "fra": "Créé Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 7
      },
      {
        "id": "modifiedby",
        "label": {
          "eng": "Modifier",
          "fra": "Modifié Par"
        },
        "type": "text",
        "multivalued": true,
        "pos": 8
      },
      {
        "id": "colorcode",
        "label": {
          "fra": "CodeCouleur",
          "eng": "ColorCode"
        },
        "type": "text",
        "multivalued": false,
        "pos": 9
      },
      {
        "id": "assoclist",
        "label": "film_sort",
        "type": "text",
        "multivalued": false,
        "pos": 10
      },
      {
        "id": "clichesrc",
        "label": {
          "fra": "Protection",
          "eng": "Protection"
        },
        "type": "text",
        "multivalued": false,
        "pos": 11
      },
      {
        "id": "reference",
        "label": {
          "eng": "Reference",
          "fra": "Référence"
        },
        "type": "text",
        "multivalued": false,
        "pos": 12
      },
      {
        "id": "media",
        "label": "disk_serial",
        "type": "text",
        "multivalued": false,
        "pos": 13
      },
      {
        "id": "disk_type",
        "label": "disk_type",
        "type": "text",
        "multivalued": false,
        "pos": 15
      },
      {
        "id": "realdate",
        "label": {
          "eng": "Date",
          "fra": "Date"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 16
      },
      {
        "id": "exif",
        "label": {
          "eng": "Image",
          "fra": "Image"
        },
        "type": "text",
        "multivalued": false,
        "pos": 17
      },
      {
        "id": "fullcliche",
        "label": {
          "fra": "NomFichierRéseau",
          "eng": "FullFileName"
        },
        "type": "text",
        "multivalued": false,
        "pos": 18
      },
      {
        "id": "dsplevel",
        "label": {
          "eng": "Web",
          "fra": "Web"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 19
      },
      {
        "id": "cdate",
        "label": "cdate",
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 20
      },
      {
        "id": "webdate",
        "label": {
          "eng": "WebDate",
          "fra": "DateWeb"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 21
      },
      {
        "id": "duration",
        "label": {
          "eng": "Timex",
          "fra": "Duréex"
        },
        "type": "date",
        "subtype": "time",
        "multivalued": false,
        "pos": 22
      },
      {
        "id": "pfx",
        "label": "pfxid",
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 25
      },
      {
        "id": "titredoc",
        "label": {
          "fra": "Titre du document",
          "eng": "Document title"
        },
        "type": "text",
        "multivalued": false,
        "pos": 101
      },
      {
        "id": "typdoc",
        "label": {
          "fra": "Type de document",
          "eng": "Document type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 102
      },
      {
        "id": "arboclass",
        "label": {
          "fra": "Arborescence de classement",
          "eng": "Structure of classification"
        },
        "type": "text",
        "multivalued": false,
        "pos": 103
      },
      {
        "id": "typvehiculeproduit",
        "label": {
          "eng": "Name of product or vehicle",
          "fra": "Nom de produit ou véhicule"
        },
        "type": "text",
        "multivalued": true,
        "pos": 104
      },
      {
        "id": "silhouette",
        "label": {
          "eng": "Silhouette",
          "fra": "Silhouette"
        },
        "type": "text",
        "multivalued": true,
        "pos": 105
      },
      {
        "id": "codvehicule",
        "label": {
          "eng": "Vehicle code",
          "fra": "Code véhicule"
        },
        "type": "text",
        "multivalued": false,
        "pos": 106
      },
      {
        "id": "typrub",
        "label": {
          "fra": "Type de rubrique",
          "eng": "Heading type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 107
      },
      {
        "id": "sousrub",
        "label": {
          "fra": "Sous rubrique",
          "eng": "Under heading"
        },
        "type": "text",
        "multivalued": true,
        "pos": 108
      },
      {
        "id": "nomstrat",
        "label": {
          "fra": "Nom de la stratégie",
          "eng": "Stategy name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 109
      },
      {
        "id": "nomcampagne",
        "label": {
          "fra": "Nom de la campagne",
          "eng": "Campaign name"
        },
        "type": "text",
        "multivalued": true,
        "pos": 110
      },
      {
        "id": "nomfilm",
        "label": {
          "fra": "Nom du film",
          "eng": "Film name"
        },
        "type": "text",
        "multivalued": false,
        "pos": 111
      },
      {
        "id": "typfilm",
        "label": {
          "fra": "Type de film",
          "eng": "Film type"
        },
        "type": "text",
        "multivalued": true,
        "pos": 112
      },
      {
        "id": "positionfilm",
        "label": {
          "fra": "Positionnement du film",
          "eng": "Film positioning"
        },
        "type": "text",
        "multivalued": false,
        "pos": 113
      },
      {
        "id": "exifdisksize",
        "label": {
          "fra": "Taille disque",
          "eng": "Disk size"
        },
        "type": "number",
        "subtype": "integer",
        "multivalued": false,
        "pos": 114
      },
      {
        "id": "sitpubli",
        "label": {
          "eng": "Site of publication",
          "fra": "Site de publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 301
      },
      {
        "id": "formattelechargement",
        "label": {
          "fra": "Format de téléchargement",
          "eng": "Download format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 302
      },
      {
        "id": "typcommand",
        "label": {
          "fra": "Type de commande",
          "eng": "Type de commande"
        },
        "type": "text",
        "multivalued": true,
        "pos": 303
      },
      {
        "id": "declarationutilisation",
        "label": {
          "fra": "Déclaration d'utilisation",
          "eng": "Déclaration d'utilisation"
        },
        "type": "text",
        "multivalued": true,
        "pos": 304
      },
      {
        "id": "responsablepubli",
        "label": {
          "fra": "Responsable de publication",
          "eng": "Person in charge of publication"
        },
        "type": "text",
        "multivalued": true,
        "pos": 305
      },
      {
        "id": "entitepeugeot",
        "label": {
          "eng": "Peugeot entity",
          "fra": "Entité Peugeot"
        },
        "type": "text",
        "multivalued": true,
        "pos": 306
      },
      {
        "id": "datdebutpubli",
        "label": {
          "fra": "Date de début de publication",
          "eng": "Beginning of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 307
      },
      {
        "id": "datfinpubli",
        "label": {
          "fra": "Date de fin de publication",
          "eng": "Dead line of publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 308
      },
      {
        "id": "datprevisionpubli",
        "label": {
          "eng": "Estimated date of publication",
          "fra": "Date prévisionnelle de publication"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 309
      },
      {
        "id": "commentairepubli",
        "label": {
          "eng": "Publication comment",
          "fra": "Commentaire sur la publication"
        },
        "type": "text",
        "multivalued": false,
        "pos": 310
      },
      {
        "id": "confidentialite",
        "label": {
          "eng": "Confidentiality",
          "fra": "Confidentialité"
        },
        "type": "text",
        "multivalued": false,
        "pos": 501
      },
      {
        "id": "listecontributeurs",
        "label": {
          "eng": "Contributors list",
          "fra": "Liste des contributeurs"
        },
        "type": "text",
        "multivalued": true,
        "pos": 502
      },
      {
        "id": "origindoc",
        "label": {
          "eng": "Peugeot entity which provided the original document",
          "fra": "Entité Peugeot qui a fourni le document original"
        },
        "type": "text",
        "multivalued": true,
        "pos": 503
      },
      {
        "id": "payscreat",
        "label": {
          "eng": "Creative country",
          "fra": "Pays créateur"
        },
        "type": "text",
        "multivalued": true,
        "pos": 504
      },
      {
        "id": "partendoc",
        "label": {
          "fra": "Agence - Partenaire qui a travaillé le document original",
          "eng": "Agency - Partner who worked the original document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 505
      },
      {
        "id": "datvalidation",
        "label": {
          "eng": "Validation date",
          "fra": "Date de validation"
        },
        "type": "date",
        "subtype": "date",
        "multivalued": false,
        "pos": 506
      },
      {
        "id": "numeroversion",
        "label": {
          "fra": "Numéro de version",
          "eng": "Version number"
        },
        "type": "text",
        "multivalued": false,
        "pos": 507
      },
      {
        "id": "typformat",
        "label": {
          "eng": "Format type",
          "fra": "Type de format"
        },
        "type": "text",
        "multivalued": true,
        "pos": 508
      },
      {
        "id": "typversion",
        "label": {
          "eng": "Version type",
          "fra": "Type de version"
        },
        "type": "text",
        "multivalued": true,
        "pos": 509
      },
      {
        "id": "extformat",
        "label": {
          "eng": "File extension",
          "fra": "Extension du fichier"
        },
        "type": "text",
        "multivalued": true,
        "pos": 510
      },
      {
        "id": "languedoc",
        "label": {
          "eng": "Document language",
          "fra": "Langue du document"
        },
        "type": "text",
        "multivalued": true,
        "pos": 511
      },
      {
        "id": "nomdoriginefichier",
        "label": {
          "eng": "Original file name",
          "fra": "Nom d'origine du fichier"
        },
        "type": "text",
        "multivalued": false,
        "pos": 512
      },
      {
        "id": "infoversionprod",
        "label": {
          "fra": "Commentaire version - informations de production",
          "eng": "Comment version - Production information"
        },
        "type": "text",
        "multivalued": false,
        "pos": 513
      }
    ],
    "tabs": [
      {
        "id": 1,
        "label": "Onglet 1",
        "fields": [
          "docid",
          "date_exacte",
          "exemplaire",
          "cliche",
          "mdate",
          "createdby",
          "modifiedby",
          "colorcode",
          "assoclist",
          "clichesrc",
          "reference",
          "media",
          "disk_type",
          "realdate",
          "exif",
          "fullcliche",
          "dsplevel",
          "cdate",
          "webdate",
          "duration",
          "pfx"
        ]
      },
      {
        "id": 2,
        "label": "Onglet 2",
        "fields": [
          "titredoc",
          "typdoc",
          "arboclass",
          "typvehiculeproduit",
          "silhouette",
          "codvehicule",
          "typrub",
          "sousrub",
          "nomstrat",
          "nomcampagne",
          "nomfilm",
          "typfilm",
          "positionfilm",
          "exifdisksize"
        ]
      },
      {
        "id": 4,
        "label": "Onglet 4",
        "fields": [
          "sitpubli",
          "formattelechargement",
          "typcommand",
          "declarationutilisation",
          "responsablepubli",
          "entitepeugeot",
          "datdebutpubli",
          "datfinpubli",
          "datprevisionpubli",
          "commentairepubli"
        ]
      },
      {
        "id": 6,
        "label": "Onglet 6",
        "fields": [
          "confidentialite",
          "listecontributeurs",
          "origindoc",
          "payscreat",
          "partendoc",
          "datvalidation",
          "numeroversion",
          "typformat",
          "typversion",
          "extformat",
          "languedoc",
          "nomdoriginefichier",
          "infoversionprod"
        ]
      }
    ]
  }
}



module.exports = bases;