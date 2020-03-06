
var Lang = function(){
    var lang = "fr";

    var fr = {
        boolean: "Booléen",
        number: "Nombre",
        "float": "Flottant",
        "integer": "Entier",
        date: "Date",
        date_time: "Date et heure",
        time: "Heure",
        duration: "Durée",
        text: "Texte",
        "multi_lingual": "Multilingue",
        "mono_lingual": "Monolingue",
        controlled: "Référentiel",
        helplist: "Liste d'aide",
        classification_plan: "Plan de classement",
        thesaurus: "Thesaurus",
        rameau: "Rameau",
        internal_link: "Lien interne",
        external_link: "Lien externe",
        any: "Tous",
        url: "URL",
        email: "email",
        structure: "Structure",
        computed: "Calculé",
        language: "Langue",
        options: "Options",
        "ref.title_create": "Créer une référence",
        "ref.label_type": "Type",
        "ref.label_value": "Valeur",
        "ref.label_max": "Taille",
        "ref.error.empty": "Référence vide",
        "ref.error.invalid": "Référence invalide",
        "ref.var.dir": "Nom du dossier",
        "ref.var.filename": "Nom du fichier",
        "ref.var.fileext": "Extension du fichier",
        "ref.var.filedate": "Date du fichier",
        "ref.var.date": "Date du jour",
        "ref.var.incr": "Numéro incrémental",
        "ref.var.base": "Nom de la base",
        "ref.var.user": "Nom de l'utilisateur",
        "ref.var.other": "Texte libre",
        "users.title_create": "Créer un utilisateur",
        "schema.title_create": "Créer un fond",
        "schema.fields": "Champs",
        "schema.name": "Nom",
        "schema.type": "Type",
        "schema.multivalued": "Multi-valué",
        "schema.mandatory": "Oblig.",
        "schema.default": "Valeur par défaut",
        "schema.expression": "Expression",
        "schema.actions": "Actions",
        "schema.name_placeholder": "Ajouter un champ à ",
        "schema.error.empty" : "Le champ ne doit pas être vide",
        "schema.error.duplicate_name" : "Ce nom existe déjà",
        "action.add": "Ajouter",
        "action.add_tab": "Ajouter un onglet",
        "action.copy": "Copier",
        "action.duplicate": "Dupliquer",
        "action.delete": "Supprimer",
        "action.edit": "Editer",
        "list.id": "Identifiant",
        "list.label": "Nom",
        "list.actions": "Actions",
        "list.email": "Email",
        "list.group": "Groupe",
        "tab.all": "Tous"
    };

    var en = {
        boolean: "Boolean",
        number: "Number",
        "float": "Float",
        "integer": "Integer",
        date: "Date",
        date_time: "Date and time",
        time: "Time",
        duration: "Duration",
        text: "Text",
        "multi_lingual": "Multilingual",
        "mono_lingual": "Monolingual",
        controlled: "Referencial",
        helplist: "Helplist",
        classification_plan: "Classification plan",
        thesaurus: "Thesaurus",
        rameau: "Rameau",
        internal_link: "Internal link",
        external_link: "External link",
        any: "Any",
        url: "URL",
        email: "email",
        structure: "Structure",
        computed: "Computed",
        language: "Language",
        options: "Options",
        "ref.title_create": "Create reference",
        "ref.label_type": "Type",
        "ref.label_value": "Value",
        "ref.label_max": "Length",
        "ref.error.empty": "Empty reference",
        "ref.error.invalid": "Invalid reference",
        "ref.var.dir": "Folder name",
        "ref.var.filename": "Filename",
        "ref.var.fileext": "File extension",
        "ref.var.filedate": "File date",
        "ref.var.date": "Date",
        "ref.var.incr": "Incremental value",
        "ref.var.base": "Base name",
        "ref.var.user": "User name",
        "ref.var.other": "Free text",
        "users.title_create": "Create new user",
        "schema.title_create": "Create new schema",
        "schema.fields": "Fields",
        "schema.name": "Name",
        "schema.type": "Type",
        "schema.multivalued": "Multi-valued",
        "schema.mandatory": "Mand.",
        "schema.default": "Default value",
        "schema.expression": "Expression",
        "schema.actions": "Actions",
        "schema.name_placeholder": "Create field in ",
        "schema.error.empty" : "Field shouldn't be empty",
        "schema.error.duplicate_name" : "Duplicate name",
        "action.add": "Add",
        "action.add_tab": "Add tab",
        "action.copy": "Copy",
        "action.duplicate": "Duplicate",
        "action.delete": "Delete",
        "action.edit": "Edit",
        "list.id": "Id",
        "list.label": "Name",
        "list.actions": "Actions",
        "list.email": "Email",
        "list.group": "Group",
        "tab.all": "All"
    };

    var langs = {
        fr: fr,
        en: en
    };

    var get = function(){
        return lang;
    };

    var set = function(l){
        lang = l;
    };

    var txt = function(msg){
        if (!msg){
            return undefined;
        }
        return langs[lang][msg];
    };

    return {
        txt: txt,
        set: set,
        get: get
    }
}();

module.exports = Lang;