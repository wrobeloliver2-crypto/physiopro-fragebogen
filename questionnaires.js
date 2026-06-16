// ============================================================
//  PhysioPro – Fragebogen-Definitionen
// ------------------------------------------------------------
//  Hier legst du neue Fragebögen an. Jeder Schlüssel (z. B. "profil")
//  wird im Link über ?typ=... aufgerufen, der Name über ?name=...
//
//  Beispiel-Links:
//    /?typ=profil&name=Nico%20Neumann
//    /?typ=feedback&name=Anna
//
//  Fragetypen:
//    { type:"text",   name:"Feldname", q:"Frage?", placeholder:"…" }
//    { type:"choice", name:"Feldname", q:"Frage?", multi:true|false,
//        options:[ {label:"Option"}, {label:"Sonstige", other:true} ],
//        otherPlaceholder:"…" }
//    Eine Option kann accent:"ok" haben (grün hervorgehoben).
// ============================================================

window.QUESTIONNAIRES = {

  // ---------- PROFIL (Mitarbeiter-Spezialisierung) ----------
  profil: {
    label: "Profil-Fragebogen",
    title: "Dein Profil bei PhysioPro",
    subtitle: "Deine Spezialisierung & deine eigenen Worte",
    intro: "Wir möchten dich auf unserer Website klar positionieren. Damit das authentisch klingt, brauchen wir deine eigenen Worte. Klick dich einfach durch, dauert ein paar Minuten. Wo du magst, schreib gern frei dazu.",
    questions: [
      { type:"text", name:"Rolle in einem Satz",
        q:"Wie würdest du deine Rolle bei PhysioPro in einem Satz beschreiben?",
        placeholder:"z. B. „Ich bin Physiotherapeut und Physiocoach – ich begleite Menschen von der Behandlung bis ins eigenständige Training.“" },
      { type:"text", name:"Unterschied Therapie/Coaching",
        q:"Was ist für dich der Unterschied zwischen Physiotherapie und Physiocoaching?",
        placeholder:"In deinen eigenen Worten – was macht das Coaching aus, das die klassische Therapie nicht leistet?" },
      { type:"choice", name:"Zielgruppe", multi:true,
        q:"Für welche Menschen ist dein Angebot besonders geeignet?",
        options:[
          {label:"Nach abgeschlossener Reha"},
          {label:"Wiederkehrende Beschwerden"},
          {label:"Sportler:innen"},
          {label:"Bewegungseinsteiger:innen"},
          {label:"Vielsitzer / Büro"},
          {label:"Sonstige", other:true}
        ], otherPlaceholder:"Wen noch?" },
      { type:"choice", name:"Methoden", multi:true,
        q:"Welche Methoden & Schwerpunkte bringst du als Therapeut mit?",
        options:[
          {label:"Manuelle Therapie"},
          {label:"Krankengymnastik"},
          {label:"Trainingstherapie"},
          {label:"Kräftigung / Aufbau"},
          {label:"Beweglichkeit / Mobility"},
          {label:"Schmerzmanagement"},
          {label:"Weitere", other:true}
        ], otherPlaceholder:"Welche noch?" },
      { type:"text", name:"Qualifikationen",
        q:"Hast du Aus-/Fortbildungen oder Zertifikate, die wir nennen sollten?",
        placeholder:"z. B. Staatsexamen Physiotherapie, Fortbildungen, Trainerlizenzen, besondere Kurse …" },
      { type:"text", name:"Motivation / Warum",
        q:"Was treibt dich an – warum machst du diesen Job?",
        placeholder:"Dein „Warum“. Das wird oft der schönste Satz auf der Profilseite." },
      { type:"text", name:"Signature-Moment / Geschichte",
        q:"Gibt es einen typischen Moment oder Erfolg mit Patient:innen, der dein Angebot auf den Punkt bringt?",
        placeholder:"Eine kleine Geschichte oder ein Beispiel – ideal für ein Testimonial." },
      { type:"choice", name:"Gewünschtes Gefühl", multi:true,
        q:"Wie sollen sich Patient:innen bei dir fühlen?",
        options:[
          {label:"Motiviert / angepackt"},
          {label:"Sicher / gut aufgehoben"},
          {label:"Ernst genommen"},
          {label:"Selbstständig / befähigt"},
          {label:"Locker / wohl"}
        ] },
      { type:"choice", name:"Einverständnis", multi:false,
        q:"Bist du einverstanden, dass wir deine Aussagen (sinngemäß) für deine Profilseite & Werbung verwenden?",
        options:[
          {label:"Ja, gern", accent:"ok"},
          {label:"Ja, aber vorher abstimmen"},
          {label:"Lieber nicht"}
        ] },
      { type:"text", name:"Sonstiges",
        q:"Möchtest du uns sonst noch etwas mitgeben?",
        placeholder:"Alles, was dir wichtig ist und oben nicht vorkam." }
    ]
  },

  // ---------- FEEDBACK (Beispiel – als Vorlage) ----------
  feedback: {
    label: "Team-Feedback",
    title: "Dein Feedback",
    subtitle: "Kurz & ehrlich – damit wir besser werden",
    intro: "Wir möchten verstehen, wie es dir bei PhysioPro geht und wo wir uns verbessern können. Deine Rückmeldung hilft uns sehr. Klick dich durch – schreib gern frei dazu.",
    questions: [
      { type:"choice", name:"Zufriedenheit gesamt", multi:false,
        q:"Wie zufrieden bist du aktuell insgesamt?",
        options:[
          {label:"Sehr zufrieden", accent:"ok"},
          {label:"Zufrieden"},
          {label:"Geht so"},
          {label:"Eher unzufrieden"}
        ] },
      { type:"text", name:"Läuft gut",
        q:"Was läuft für dich richtig gut?",
        placeholder:"Was sollten wir unbedingt beibehalten?" },
      { type:"text", name:"Verbesserung",
        q:"Was würdest du dir anders wünschen?",
        placeholder:"Ehrlich – das bleibt konstruktiv und wird wertgeschätzt." },
      { type:"text", name:"Sonstiges",
        q:"Gibt es sonst etwas, das du loswerden möchtest?",
        placeholder:"Optional." }
    ]
  }

};
