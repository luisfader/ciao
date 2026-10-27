/* Ciao, amore! 2 — struttura del manuale.
   available: true = unità già pubblicata sul sito. */
window.CIAO = window.CIAO || {};

CIAO.units = [
  {
    n: 1, place: 'Venezia', cover: 4, available: true,
    temi: ['Presentarsi', 'Parlare di sé', 'La lingua italiana e il mistero di Venezia'],
    tagline: 'venezia è misteriosa, ma il mio cuore ha un solo segreto: tu',
    focus: 'essere, avere e piacere',
    sections: [
      { id: 'A', title: 'Ci conosciamo', pages: [5, 6] },
      { id: 'B', title: 'Parliamo dei gusti', pages: [7, 8] },
      { id: 'C', title: 'Venezia: città di misteri', pages: [9, 10] },
      { id: 'D', title: 'Grammatica', pages: [11], grammar: true },
      { id: 'E', title: 'Test', pages: [12] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [13] }
    ],
    grammar: `
      <h3>Essere e avere</h3>
      <table class="conj"><thead><tr><th></th><th>essere</th><th>avere</th></tr></thead><tbody>
        <tr><td>io</td><td>sono</td><td>ho</td></tr><tr><td>tu</td><td>sei</td><td>hai</td></tr>
        <tr><td>lui / lei</td><td>è</td><td>ha</td></tr><tr><td>noi</td><td>siamo</td><td>abbiamo</td></tr>
        <tr><td>voi</td><td>siete</td><td>avete</td></tr><tr><td>loro</td><td>sono</td><td>hanno</td></tr>
      </tbody></table>
      <p><b>Essere</b> per nome, professione e nazionalità: <i>Sono insegnante. Sono romano.</i><br>
      <b>Avere</b> per l’età: <i>Ho 25 anni</i> (non “sono 25 anni”).</p>
      <h3>Piacere</h3>
      <p><b>Mi piace</b> + singolare o infinito: <i>Mi piace Venezia. Mi piace viaggiare.</i><br>
      <b>Mi piacciono</b> + plurale: <i>Mi piacciono i musei.</i></p>
      <p>mi → a me · ti → a te · gli → a lui · le → a lei</p>`
  },
  {
    n: 2, place: 'Napoli', cover: 14, available: true,
    temi: ['L’aspetto fisico', 'Il carattere', 'I segni dello zodiaco', 'Le relazioni personali'],
    tagline: 'sei alto, bello e un po’ misterioso: proprio il mio tipo',
    focus: 'aggettivi e pronomi diretti',
    sections: [
      { id: 'A', title: 'Come sono?', pages: [15, 16] },
      { id: 'B', title: 'Che caratterino, mio Dio!', pages: [17, 18] },
      { id: 'C', title: 'Napoli', pages: [19, 20] },
      { id: 'D', title: 'Grammatica', pages: [21, 22], grammar: true },
      { id: 'E', title: 'Test', pages: [23, 24] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [25] }
    ],
    grammar: `
      <h3>Descrivere una persona</h3>
      <p><b>Essere</b> per tratti generali e carattere: <i>Luca è alto e magro.</i><br>
      <b>Avere</b> per parti del corpo: <i>Ha gli occhi verdi.</i><br>
      <b>Portare</b> per ciò che si ha addosso abitualmente: <i>Porta la barba, porta gli occhiali.</i><br>
      <b>Indossare</b> per i vestiti di oggi: <i>Oggi indossa una giacca di pelle.</i></p>
      <h3>Pronomi di complemento diretto</h3>
      <table class="conj"><tbody>
        <tr><td>mi</td><td>Il mio ragazzo mi ama.</td></tr><tr><td>ti</td><td>Io ti aspetto sempre.</td></tr>
        <tr><td>lo</td><td>Marco? Lo vedo ogni giorno.</td></tr><tr><td>la</td><td>Laura? La chiamo stasera.</td></tr>
        <tr><td>ci</td><td>Il nostro amore ci rende felici.</td></tr><tr><td>vi</td><td>Ragazzi, vi accompagno?</td></tr>
        <tr><td>li</td><td>I tuoi ex? Li ho dimenticati.</td></tr><tr><td>le</td><td>Le tue amiche? Le invito.</td></tr>
      </tbody></table>
      <p>Il pronome va <b>prima del verbo</b> (<i>La amo</i>), oppure attaccato all’infinito (<i>Voglio vederti</i>).
      Con il passato prossimo il participio si accorda: <i>Ho visto Maria → L’ho vista.</i></p>`
  },
  {
    n: 3, place: 'Roma', cover: 26, available: true,
    temi: ['Quando ero bambino', 'Gli animali', 'L’imperfetto'],
    tagline: 'tutte le strade portano a roma, la mia porta a te',
    focus: 'l’imperfetto',
    sections: [
      { id: 'A', title: 'Prima tutto era diverso', pages: [27, 28] },
      { id: 'B', title: 'Le preferenze dei bambini', pages: [29, 30] },
      { id: 'C', title: 'La città eterna', pages: [31, 32] },
      { id: 'D', title: 'Grammatica', pages: [33], grammar: true },
      { id: 'E', title: 'Test', pages: [34] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [35] }
    ],
    grammar: `
      <h3>L’imperfetto</h3>
      <table class="conj"><thead><tr><th></th><th>-are</th><th>-ere</th><th>-ire</th></tr></thead><tbody>
        <tr><td>io</td><td>parlavo</td><td>credevo</td><td>dormivo</td></tr>
        <tr><td>tu</td><td>parlavi</td><td>credevi</td><td>dormivi</td></tr>
        <tr><td>lui / lei</td><td>parlava</td><td>credeva</td><td>dormiva</td></tr>
        <tr><td>noi</td><td>parlavamo</td><td>credevamo</td><td>dormivamo</td></tr>
        <tr><td>voi</td><td>parlavate</td><td>credevate</td><td>dormivate</td></tr>
        <tr><td>loro</td><td>parlavano</td><td>credevano</td><td>dormivano</td></tr>
      </tbody></table>
      <p>Irregolari: <b>essere</b> → ero, eri, era, eravamo, eravate, erano · <b>fare</b> → facevo · <b>dire</b> → dicevo.</p>
      <p>Si usa per <b>abitudini</b> (<i>Da piccolo giocavo sempre al parco</i>), <b>descrizioni</b>
      (<i>La casa era grande</i>) e <b>azioni in corso</b> nel passato (<i>Mentre leggevo, è arrivato Marco</i>).</p>`
  },
  {
    n: 4, place: 'Firenze', cover: 36, available: true,
    temi: ['Viaggiare', 'Il modo condizionale', 'Firenze, città d’arte'],
    tagline: 'a firenze vorrei perdermi, ma solo con te',
    focus: 'il condizionale',
    sections: [
      { id: 'A', title: 'Amo l’arte', pages: [37, 38] },
      { id: 'B', title: 'Vorrei imparare a disegnare', pages: [39, 40] },
      { id: 'C', title: 'Firenze, la città dell’arte', pages: [41, 42] },
      { id: 'D', title: 'Grammatica', pages: [43], grammar: true },
      { id: 'E', title: 'Test', pages: [44] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [45] }
    ],
    grammar: `
      <h3>Il condizionale presente</h3>
      <p>Desinenze: -ei, -esti, -ebbe, -emmo, -este, -ebbero (parlare → parlerei, credere → crederei, dormire → dormirei).</p>
      <table class="conj"><thead><tr><th></th><th>volere</th></tr></thead><tbody>
        <tr><td>io</td><td>vorrei</td></tr><tr><td>tu</td><td>vorresti</td></tr><tr><td>lui / lei</td><td>vorrebbe</td></tr>
        <tr><td>noi</td><td>vorremmo</td></tr><tr><td>voi</td><td>vorreste</td></tr><tr><td>loro</td><td>vorrebbero</td></tr>
      </tbody></table>
      <p>Irregolari: sarei, avrei, farei, direi, berrei, andrei, verrei, potrei, dovrei, vorrei.<br>
      -care / -gare aggiungono <b>h</b>: pagherei · -ciare / -giare perdono la <b>i</b>: mangerei.</p>
      <p>Si usa per un <b>desiderio</b> (<i>Vorrei un caffè</i>), una <b>richiesta gentile</b> (<i>Potresti aiutarmi?</i>),
      un <b>consiglio</b> (<i>Dovresti studiare di più</i>) e una <b>possibilità</b> (<i>Sarebbe bello viaggiare</i>).</p>`
  },
  {
    n: 5, place: 'Pisa, Siena e Volterra', cover: 46, available: true,
    temi: ['Viaggiare', 'Il modo condizionale', 'Il verbo volere all’imperfetto', 'I misteri della Toscana'],
    tagline: 'anche la torre di pisa si inclina quando passi tu',
    focus: 'volere e sapere all’imperfetto',
    sections: [
      { id: 'A', title: 'Viaggiamo!', pages: [47, 48] },
      { id: 'B', title: 'Non lo sapevo', pages: [49, 50] },
      { id: 'C', title: 'Leggiamo e scopriamo', pages: [51, 52] },
      { id: 'D', title: 'Grammatica', pages: [53], grammar: true },
      { id: 'E', title: 'Test', pages: [54] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [55] }
    ],
    grammar: `
      <h3>Volere e sapere all’imperfetto</h3>
      <table class="conj"><thead><tr><th></th><th>volere</th><th>sapere</th></tr></thead><tbody>
        <tr><td>io</td><td>volevo</td><td>sapevo</td></tr><tr><td>tu</td><td>volevi</td><td>sapevi</td></tr>
        <tr><td>lui / lei</td><td>voleva</td><td>sapeva</td></tr><tr><td>noi</td><td>volevamo</td><td>sapevamo</td></tr>
        <tr><td>voi</td><td>volevate</td><td>sapevate</td></tr><tr><td>loro</td><td>volevano</td><td>sapevano</td></tr>
      </tbody></table>
      <p><i>Volevo parlare con te</i> = intenzione · <i>Ho voluto parlare con te</i> = decisione concreta.<br>
      <i>Sapevo la notizia</i> = la conoscevo già · <i>Ho saputo la notizia</i> = l’ho scoperta.</p>
      <p>Richiesta gentile: <i>Volevo chiederti una cosa.</i></p>
      <p>Sapere al presente: so, sai, sa, sappiamo, sapete, sanno.</p>`
  },
  {
    n: 6, place: 'Milano', cover: 56, available: true,
    temi: ['Il teatro', 'Norme di comportamento', 'La moda italiana', 'Milano'],
    tagline: 'a teatro guardavo il palco, ma vedevo solo te',
    focus: 'l’imperativo',
    sections: [
      { id: 'A', title: 'Andiamo a teatro!', pages: [57, 58] },
      { id: 'B', title: 'Buona educazione', pages: [59, 60] },
      { id: 'C', title: 'Parliamo di moda', pages: [61, 62] },
      { id: 'D', title: 'Grammatica', pages: [63], grammar: true },
      { id: 'E', title: 'Test', pages: [64] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [65] },
      { id: 'G', title: 'Momento musicale', pages: [66] },
      { id: 'H', title: 'Impara un po’ di più', pages: [67] }
    ],
    grammar: `
      <h3>L’imperativo</h3>
      <table class="conj"><thead><tr><th>infinito</th><th>tu</th><th>Lei</th><th>voi</th></tr></thead><tbody>
        <tr><td>parlare</td><td>parla</td><td>parli</td><td>parlate</td></tr>
        <tr><td>prendere</td><td>prendi</td><td>prenda</td><td>prendete</td></tr>
        <tr><td>dormire</td><td>dormi</td><td>dorma</td><td>dormite</td></tr>
      </tbody></table>
      <p><b>Tu</b>: -are → -a, -ere / -ire → -i. <b>Lei</b> (formale): si usa il congiuntivo presente.
      <b>Voi</b>: uguale al presente.</p>
      <p>Negativo con <b>tu</b>: non + infinito (<i>Non parlare!</i>). Con Lei e voi: <i>Non parli! Non prendete!</i></p>
      <p>Irregolari (tu): va’/vai, da’/dai, fa’/fai, sta’/stai, di’.</p>`
  },
  {
    n: 7, place: 'La cucina italiana', cover: 68, available: true,
    temi: ['La cucina italiana', 'Il cibo e la cultura', 'Come preparare la pasta', 'L’imperativo'],
    tagline: 'aggiungi un pizzico d’amore e mescola piano piano',
    focus: 'l’imperativo irregolare',
    sections: [
      { id: 'A', title: 'Cosa hai mangiato ieri?', pages: [69, 70] },
      { id: 'B', title: 'Sai cucinare?', pages: [71, 72] },
      { id: 'C', title: 'Impariamo e mangiamo!', pages: [73] },
      { id: 'D', title: 'Grammatica', pages: [74], grammar: true },
      { id: 'E', title: 'Test', pages: [75] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [76] },
      { id: 'G', title: 'Momento musicale', pages: [77] }
    ],
    grammar: `
      <h3>L’imperativo dei verbi irregolari (tu)</h3>
      <table class="conj"><tbody>
        <tr><td>andare</td><td>va’ / vai</td><td><i>Va’ a casa subito!</i></td></tr>
        <tr><td>dare</td><td>da’ / dai</td><td><i>Da’ una mano a tua madre!</i></td></tr>
        <tr><td>fare</td><td>fa’ / fai</td><td><i>Fa’ attenzione!</i></td></tr>
        <tr><td>stare</td><td>sta’ / stai</td><td><i>Sta’ tranquillo!</i></td></tr>
        <tr><td>dire</td><td>di’</td><td><i>Di’ la verità!</i></td></tr>
        <tr><td>essere</td><td>sii</td><td><i>Sii sincero!</i></td></tr>
        <tr><td>avere</td><td>abbi</td><td><i>Abbi pazienza!</i></td></tr>
      </tbody></table>
      <p>Negativo (tu): <b>non + infinito</b> — <i>Non mangiare! Non andare via!</i></p>`
  },
  {
    n: 8, place: 'Torino', cover: 78, available: true,
    temi: ['La salute', 'Fare sport', 'In giro per Torino', 'Azioni in corso'],
    tagline: 'torino ha il bicerin, io ho la tua dolcezza',
    focus: 'dovere, stare + gerundio',
    sections: [
      { id: 'A', title: 'Come ti senti?', pages: [79, 80] },
      { id: 'B', title: 'Fare sport', pages: [81, 82] },
      { id: 'C', title: 'Leggi e scopri', pages: [83, 84] },
      { id: 'D', title: 'Grammatica', pages: [85], grammar: true },
      { id: 'E', title: 'Test', pages: [86] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [87] }
    ],
    grammar: `
      <h3>Stare + gerundio</h3>
      <p>Un’azione che succede <b>adesso</b>: <i>Sto mangiando. Stiamo guardando la partita.</i><br>
      Gerundio: parlare → parlando, leggere → leggendo, dormire → dormendo.</p>
      <h3>Stare per + infinito</h3>
      <p>Un’azione che <b>sta per iniziare</b>: <i>Sto per uscire. Sta per iniziare la partita.</i></p>
      <p><i>Sto mangiando</i> = azione in corso · <i>Sto per mangiare</i> = non ancora iniziata.</p>
      <h3>Dovere</h3>
      <p>devo, devi, deve, dobbiamo, dovete, devono — <i>Deve riposare di più. Non dovete fumare.</i></p>`
  },
  {
    n: 9, place: 'L’amore', cover: 88, available: true,
    temi: ['L’amore', 'Il congiuntivo', 'Il romanticismo'],
    tagline: 'spero che tu sia felice, soprattutto con me',
    focus: 'il congiuntivo presente',
    sections: [
      { id: 'A', title: 'Colpi di fulmine', pages: [89, 90] },
      { id: 'B', title: 'Spero che tutti siano felici', pages: [91, 92] },
      { id: 'C', title: 'Cos’è l’amore?', pages: [93, 94] },
      { id: 'D', title: 'Grammatica', pages: [95], grammar: true },
      { id: 'E', title: 'Test', pages: [96] },
      { id: 'F', title: 'Momento musicale', pages: [97] }
    ],
    grammar: `
      <h3>Il congiuntivo presente</h3>
      <table class="conj"><thead><tr><th></th><th>-are</th><th>-ere</th><th>-ire</th></tr></thead><tbody>
        <tr><td>io / tu / lui</td><td>parli</td><td>creda</td><td>dorma</td></tr>
        <tr><td>noi</td><td>parliamo</td><td>crediamo</td><td>dormiamo</td></tr>
        <tr><td>voi</td><td>parliate</td><td>crediate</td><td>dormiate</td></tr>
        <tr><td>loro</td><td>parlino</td><td>credano</td><td>dormano</td></tr>
      </tbody></table>
      <p>Irregolari: essere → sia · avere → abbia · andare → vada · fare → faccia · dire → dica ·
      stare → stia · venire → venga · sapere → sappia · potere → possa · volere → voglia.</p>
      <p>Dopo espressioni di <b>opinione</b> (penso che, credo che), <b>emozione</b> (sono felice che, ho paura che),
      <b>dubbio</b> (non so se, è possibile che) e <b>volontà</b> (voglio che, è importante che).</p>
      <p>✗ <i>Penso che lui ama</i> → ✓ <i>Penso che lui ami</i></p>`
  },
  {
    n: 10, place: 'La nuova casa in Toscana', cover: 98, available: true,
    temi: ['La casa', 'Parlare di piani e del futuro', 'Fatti interessanti sull’Italia'],
    tagline: 'domani ti amerò ancora di più',
    focus: 'il futuro semplice',
    sections: [
      { id: 'A', title: 'Ti invito nella mia nuova casa', pages: [99, 100] },
      { id: 'B', title: 'Piani per il futuro', pages: [101, 102] },
      { id: 'C', title: 'Cose molto italiane', pages: [103, 104] },
      { id: 'D', title: 'Grammatica', pages: [105], grammar: true },
      { id: 'E', title: 'Test', pages: [106] },
      { id: 'F', title: 'Mi piacciono i fumetti!', pages: [107] },
      { id: 'G', title: 'Momento musicale', pages: [108] }
    ],
    grammar: `
      <h3>Il futuro semplice</h3>
      <table class="conj"><thead><tr><th></th><th>parlare</th><th>prendere</th><th>dormire</th></tr></thead><tbody>
        <tr><td>io</td><td>parlerò</td><td>prenderò</td><td>dormirò</td></tr>
        <tr><td>tu</td><td>parlerai</td><td>prenderai</td><td>dormirai</td></tr>
        <tr><td>lui / lei</td><td>parlerà</td><td>prenderà</td><td>dormirà</td></tr>
        <tr><td>noi</td><td>parleremo</td><td>prenderemo</td><td>dormiremo</td></tr>
        <tr><td>voi</td><td>parlerete</td><td>prenderete</td><td>dormirete</td></tr>
        <tr><td>loro</td><td>parleranno</td><td>prenderanno</td><td>dormiranno</td></tr>
      </tbody></table>
      <p>Irregolari: sarò, avrò, farò, dirò, andrò, vedrò, verrò, dovrò, potrò, vorrò.<br>
      Ortografia: cercare → cercherò, pagare → pagherò.</p>
      <p>Si usa per azioni future e per fare ipotesi.</p>`
  }
];

CIAO.finalAvailable = () => CIAO.units.every(u => u.available);
