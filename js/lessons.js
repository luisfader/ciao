/* Contenuto interattivo delle unità.
   Ogni sezione ha una lista di blocchi:
     { html }                         testo, dialoghi, riquadri
     { img, alt, size?, caption? }    illustrazione (size: 's' | 'm' | 'l' | 'full')
     { ex: {...} }                    esercizio interattivo (vedi js/exercises.js)
   Sintassi negli esercizi:
     [[risposta|alternativa]]         spazio da riempire (scrivendo o trascinando)
     {{giusta*|sbagliata}}            scelta dentro la frase                        */
window.CIAO = window.CIAO || {};

const say = (who, line, cls = '') => `<p class="line ${cls}"><b>${who}</b> ${line}</p>`;
const I = n => `assets/img/${n}.webp`;

CIAO.lessons = {
  1: {
    A: [
      { img: I('u1-incontro'), alt: 'Natalia sul Canal Grande al tramonto', size: 'full' },
      { html: `<h3>Incontro a Venezia</h3>
        <p class="lead">È sera a Venezia. Le luci si riflettono sull’acqua. Cinque persone si incontrano per la prima volta.</p>
        <div class="dialogue">
        ${say('Marco', 'Buonasera. Mi chiamo Marco. Sono detective.')}
        ${say('Franco', 'Ciao! Io sono Franco. Ho 25 anni e lavoro come informatico.')}
        ${say('Chiara', 'Salve, mi chiamo Chiara. Sono insegnante di storia.')}
        ${say('Roberto', 'Piacere! Sono Roberto, argentino. Sono archeologo.')}
        ${say('Natalia', 'Buonasera… mi chiamo Natalia. Sono veneziana.')}
        ${say('Marco', 'Piacere. È la prima volta che siete a Venezia?')}
        ${say('Franco', 'Sì, è la prima volta.')}
        ${say('Chiara', 'Per me no. Amo questa città.')}
        ${say('Roberto', 'Venezia è misteriosa…')}
        ${say('Natalia', '<i>(sorride)</i> Sì… molto misteriosa.')}
        </div>` },
      { ex: { id: '1A1', type: 'bank', title: 'Comprensione', hint: 'Trascina le risposte al posto giusto, oppure toccale e poi tocca lo spazio.',
        lines: ['Chi è detective? [[Marco]]', 'Chi è argentino? [[Roberto]]', 'Chi ama Venezia? [[Chiara]]', 'Dove sono i personaggi? [[A Venezia]]'],
        extra: ['Franco', 'Natalia', 'A Roma'], layout: 'list' } },
      { html: `<div class="box"><h4>Espressioni utili</h4>
        <div class="chips-static"><span>Buonasera</span><span>Ciao</span><span>Salve</span><span>Piacere</span><span>Mi chiamo…</span><span>Sono…</span></div>
        <p>In italiano si usa <b>sono</b> per dire professione e nazionalità: <i>Sono detective. Sono argentino.</i></p></div>` },
      { ex: { id: '1A2', type: 'select', title: 'Osserva e scegli', hint: 'Tocca la parola giusta.',
        lines: ['Buonasera. Mi {{chiamo*|sono}} Marco. {{Sono*|Ho}} detective.',
          'Ciao! Io sono Franco. {{Ho*|Sono}} 25 anni e lavoro come informatico.',
          'Salve, mi chiamo Chiara. {{Sono*|Ho}} insegnante di storia.',
          'Piacere! Sono Roberto, {{argentino*|Argentina}}. Sono archeologo.'] } },
      { img: I('u1-italiano-mondo'), alt: 'Simboli della cultura italiana', size: 's', float: 'right' },
      { html: `<h3>L’italiano nel mondo</h3>
        <p>L’italiano è una lingua molto amata nel mondo. Molte persone studiano l’italiano per motivi diversi. Alcuni lo studiano per viaggiare in Italia e conoscere la cultura italiana. Altri lo imparano per lavoro o per studio.</p>
        <p>L’italiano è la lingua dell’arte, della musica e della storia. Molti studenti amano l’italiano perché è una lingua melodiosa e piacevole da ascoltare. Inoltre, l’Italia è famosa per la sua cucina, la moda e il cinema. Per questo motivo, tante persone vogliono imparare l’italiano.</p>
        <p>Anche le origini familiari sono importanti. Molte persone nel mondo hanno origini italiane e vogliono conoscere la lingua dei loro nonni. Studiare l’italiano è anche un modo per scoprire una cultura ricca e affascinante.</p>` },
      { img: I('u1-famosi'), alt: 'Italiani famosi nella storia', size: 'l' },
      { ex: { id: '1A3', type: 'match', title: 'Italiani famosi nella storia', hint: 'Che cosa hanno fatto? Trascina ogni azione accanto al personaggio.',
        pairs: [['Leonardo da Vinci', 'ha dipinto la Gioconda'], ['Michelangelo', 'ha scolpito il David'], ['Galileo Galilei', 'ha studiato il cielo e le stelle'],
          ['Cristoforo Colombo', 'ha attraversato l’Atlantico'], ['Marco Polo', 'ha viaggiato a lungo in Asia'], ['Dante Alighieri', 'ha scritto la Divina Commedia'],
          ['Sophia Loren', 'ha recitato in molti film'], ['Giuseppe Garibaldi', 'ha combattuto per l’unità d’Italia'], ['Giulio Cesare', 'ha conquistato la Gallia'],
          ['Federico Fellini', 'ha diretto grandi film'], ['Luciano Pavarotti', 'ha cantato in tutto il mondo'], ['Enzo Ferrari', 'ha fondato la Ferrari']] } }
    ],
    B: [
      { img: I('u1-ponte'), alt: 'Franco e Chiara su un ponte di Venezia', size: 'full' },
      { html: `<p class="lead">I personaggi continuano a parlare a Venezia…</p>
        <div class="dialogue">
        ${say('Franco', 'Ti piace Venezia?')}
        ${say('Chiara', 'Sì, mi piace moltissimo. Questa è la quarta volta che vengo a Venezia e ogni volta è magica. Mi affascina l’unione di storia e modernità.')}
        ${say('Franco', 'Capisco. Adoro l’architettura di questa città. Ogni volta che vedo il Canal Grande, sento un’emozione unica, come la prima volta.')}
        ${say('Chiara', 'Sai, anche se ci sono molti turisti, Venezia riesce a mantenere il suo mistero.')}
        ${say('Franco', 'È vero. Venezia ha qualcosa di speciale che non si trova in nessun altro luogo.')}
        </div>` },
      { ex: { id: '1B1', type: 'bank', title: 'Completa il testo con le parole del riquadro',
        lines: ['Franco e Chiara sono a [[Venezia]].', 'A Franco [[piace]] molto [[viaggiare]].', 'Gli [[piacciono]] anche i [[musei]] e l’architettura.',
          'A Chiara [[piace]] la città.', 'Le [[piacciono]] i [[misteri]] e la storia.', 'Insieme, Franco e Chiara amano scoprire nuovi luoghi.'] } },
      { ex: { id: '1B2', type: 'select', title: 'Piace o piacciono?',
        lines: ['A Franco {{piace*|piacciono}} l’architettura.', 'A Chiara {{piacciono*|piace}} i misteri di Venezia.', 'Mi {{piace*|piacciono}} visitare i musei.',
          'Ti {{piacciono*|piace}} le città italiane?', 'Ci {{piace*|piacciono}} scoprire nuovi luoghi.'],
        tip: 'Piace + singolare o infinito · piacciono + plurale.' } },
      { html: `<div class="box"><h4>Espressioni per esprimere gusti</h4>
        <div class="two-col">
          <ul><li><b>Mi piace / Mi piacciono</b></li><li><b>A me piace</b> (enfatico) · a me sì / a me no</li><li><b>Preferisco</b></li><li><b>Adoro</b>, mi piace moltissimo</li><li><b>Detesto / Odio</b></li><li><b>Non mi piace per niente / affatto</b></li></ul>
          <ul class="examples"><li>Mi piace il gelato.</li><li>Non mi piacciono i film horror.</li><li>A me piace viaggiare, a me no.</li><li>Preferisco il tè al caffè.</li><li>Adoro la musica!</li><li>Detesto il freddo.</li></ul>
        </div></div>` },
      { img: I('u1-gusti'), alt: 'Marco e Alice: a chi piace…?', size: 's', float: 'right' },
      { ex: { id: '1B3', type: 'sort', title: 'Marco e Alice hanno gusti diversi', graded: false,
        hint: 'Prova a indovinare cosa piace a ciascuno: trascina ogni gusto nella colonna giusta. Non c’è una sola risposta: nell’unità 2 scoprirai di più su Alice!',
        cols: ['A Marco piace…', 'Ad Alice piace…'],
        chips: ['leggere gialli', 'l’astrologia', 'i film horror', 'gli animali', 'studiare le stelle', 'viaggiare', 'mangiare pizza', 'andare ai concerti', 'i misteri'] } },
      { ex: { id: '1B4', type: 'open', title: 'A coppie: domande e risposte',
        hint: 'Rispondi usando a me piace, a me no, io preferisco. Poi fai le stesse domande a un compagno.',
        prompts: ['Cosa ti piace fare nel fine settimana?', 'Ti piace la pizza?', 'Preferisci il cinema o il teatro?', 'Ti piace studiare le lingue?'],
        model: 'A: Cosa ti piace fare nel fine settimana?\nB: A me piace andare al cinema. E a te?\nA: A me no, io preferisco restare a casa e leggere.' } }
    ],
    C: [
      { img: I('u1-canal-grande'), alt: 'Gondola sul Canal Grande al tramonto', size: 's', float: 'right' },
      { html: `<h3>Venezia: città di misteri</h3>
        <p>Venezia è una delle città più famose d’Italia. Si trova nel nord del paese ed è costruita su più di 100 isole.</p>
        <p>Non ci sono strade, come nelle altre città, ma canali. Le persone si muovono a piedi o in barca. Il Canal Grande è il canale principale. Ci sono anche molte gondole, simbolo di Venezia.</p>
        <p>Venezia è famosa per la sua storia, la sua arte e la sua architettura. Ogni anno milioni di turisti visitano la città.</p>
        <p>Ma Venezia non è solo bella… è anche misteriosa. Di notte, le strade sono silenziose. Le luci si riflettono sull’acqua e tutto sembra diverso. Si dice che Venezia nasconda segreti antichi.</p>` },
      { ex: { id: '1C1', type: 'tf', title: 'Vero o falso?',
        items: [['Venezia si trova nel sud dell’Italia.', false], ['La città è costruita su più di 100 isole.', true], ['A Venezia ci sono molte strade come nelle altre città.', false],
          ['Le persone si muovono solo in macchina.', false], ['Il Canal Grande è il canale principale.', true], ['Le gondole sono un simbolo di Venezia.', true],
          ['Venezia è famosa solo per il turismo.', false], ['Di notte Venezia è rumorosa.', false], ['Le luci si riflettono sull’acqua.', true], ['Venezia nasconde segreti antichi.', true]] } },
      { ex: { id: '1C2', type: 'mc', title: 'Comprensione',
        items: [
          { q: 'Dove si trova Venezia?', o: ['Nel nord d’Italia', 'Nel sud d’Italia', 'Nel centro d’Italia'] },
          { q: 'Quante isole ha Venezia?', o: ['Più di 100', 'Circa 10', 'Solo una'] },
          { q: 'Come si muovono le persone?', o: ['A piedi o in barca', 'In macchina', 'In metropolitana'] },
          { q: 'Cos’è il Canal Grande?', o: ['Il canale principale', 'Un ponte famoso', 'Una piazza'] },
          { q: 'Perché Venezia è misteriosa?', o: ['Di notte è silenziosa e si dice che nasconda segreti antichi', 'Perché ci sono molti turisti', 'Perché è una città moderna'] }] } },
      { img: I('u1-roberto'), alt: 'Roberto, archeologo', size: 'xs', float: 'left', caption: 'Roberto, archeologo che vuole scoprire i segreti della Venezia sottomarina' },
      { ex: { id: '1C3', type: 'open', title: 'Parliamo', prompts: ['Ti piace Venezia?', 'Preferisci il giorno o la notte?', 'Ti piacciono le città storiche?'],
        model: 'Sì, mi piace molto: è una città romantica e misteriosa.\nPreferisco la notte, perché le luci si riflettono sull’acqua.\nSì, mi piacciono moltissimo le città storiche.' } },
      { html: `<h3>Momento letterario</h3>
        <p class="note">Un frammento del romanzo di Roberto Fader <i>Maschera di Venezia</i>.</p>` },
      { img: I('u1-maschera'), alt: 'Una ragazza con la maschera in una calle di Venezia', size: 's', float: 'right' },
      { html: `<div class="literary">
        <p>Nel cuore della calle stretta, illuminata appena da una lanterna tremolante, lei si fermò.</p>
        <p>Roberto sentiva il proprio cuore battere nel silenzio improvviso, come se il rumore della festa fosse rimasto lontano, in un altro mondo. La figura davanti a lui sembrava irreale, sospesa tra ombra e luce.</p>
        <p>La ragazza si voltò lentamente. Gli occhi azzurri lo fissarono attraverso la maschera, profondi, immobili, come se lo conoscessero da sempre.</p>
        <p>Poi, con un gesto lento e preciso, sollevò la bauta. Roberto trattenne il respiro.</p>
        <p>— Sei sicuro di voler sapere? — sussurrò lei.</p>
        <p>La sua voce non sembrava appartenere a quella calle. Era distante, come un’eco, eppure vicinissima, come un pensiero.</p>
        <p>Un istante dopo, non c’era più.</p></div>` },
      { ex: { id: '1C4', type: 'mc', title: 'Domande sul frammento',
        items: [
          { q: 'Dove si trovano Roberto e la ragazza?', o: ['In una calle stretta di Venezia', 'In piazza San Marco', 'Su una gondola'] },
          { q: 'Com’è l’atmosfera della calle?', o: ['Buia e silenziosa, illuminata da una lanterna', 'Allegra e piena di gente', 'Luminosa come di giorno'] },
          { q: 'Che cosa sente Roberto nel silenzio?', o: ['Il proprio cuore che batte', 'La musica della festa', 'Il rumore dell’acqua'] },
          { q: 'Come sono descritti gli occhi della ragazza?', o: ['Azzurri, profondi, immobili', 'Verdi e allegri', 'Neri e tristi'] },
          { q: 'Che gesto fa la ragazza con la maschera?', o: ['Solleva la bauta', 'Si mette la maschera', 'Lancia la maschera nel canale'] },
          { q: 'Che cosa chiede la ragazza a Roberto?', o: ['«Sei sicuro di voler sapere?»', '«Come ti chiami?»', '«Vuoi ballare con me?»'] },
          { q: 'Che cosa succede subito dopo le sue parole?', o: ['La ragazza scompare', 'Roberto la bacia', 'La ragazza ride'] }] } }
    ],
    D: [
      { html: `<div class="grammar-grid">
        <div class="gcard"><h4>Il verbo essere</h4>
          <table class="conj"><tbody><tr><td>io</td><td>sono</td></tr><tr><td>tu</td><td>sei</td></tr><tr><td>lui / lei</td><td>è</td></tr><tr><td>noi</td><td>siamo</td></tr><tr><td>voi</td><td>siete</td></tr><tr><td>loro</td><td>sono</td></tr></tbody></table>
          <p>Per <b>nome, professione, nazionalità</b>: <i>Sono romano. Sono insegnante.</i></p></div>
        <div class="gcard"><h4>Il verbo avere</h4>
          <table class="conj"><tbody><tr><td>io</td><td>ho</td></tr><tr><td>tu</td><td>hai</td></tr><tr><td>lui / lei</td><td>ha</td></tr><tr><td>noi</td><td>abbiamo</td></tr><tr><td>voi</td><td>avete</td></tr><tr><td>loro</td><td>hanno</td></tr></tbody></table>
          <p>Per <b>l’età</b>: <i>Ho 25 anni</i> (non “sono 25 anni”). <i>Chiara ha 26 anni.</i></p></div>
        <div class="gcard"><h4>Il verbo piacere</h4>
          <p>Attenzione: funziona in modo diverso.</p>
          <p><b>Mi piace</b> + singolare: <i>Mi piace Venezia. Mi piace il museo.</i></p>
          <p><b>Mi piacciono</b> + plurale: <i>Mi piacciono i musei. Mi piacciono i misteri.</i></p>
          <p>mi → a me · ti → a te · gli → a lui · le → a lei</p></div>
        </div>` },
      { ex: { id: '1D1', type: 'match', title: 'Domande e risposte', hint: 'Abbina ogni domanda alla risposta.',
        pairs: [['Ti chiami Alessio?', 'Sì, mi chiamo Alessio.'], ['Sei romano?', 'Sì, sono romano.'], ['Hai 25 anni?', 'Sì, ho 25 anni.'], ['Ti piace Venezia?', 'Sì, mi piace molto.']] } },
      { ex: { id: '1D2', type: 'gaps', title: 'Coniuga essere o avere', hint: 'Scrivi la forma giusta del verbo tra parentesi.',
        lines: ['Io [[sono]] (essere) di Buenos Aires.', 'Tu [[hai]] (avere) 20 anni?', 'Natalia [[è]] (essere) veneziana.', 'Noi [[abbiamo]] (avere) un amico a Venezia.', 'Voi [[siete]] (essere) studenti?', 'Marco e Alice [[hanno]] (avere) gusti diversi.'] } }
    ],
    E: [
      { img: I('u1-gondola'), alt: 'Gondola a Venezia', size: 's', float: 'right' },
      { html: `<h3>1. Lettura</h3><p>Venezia è una città famosa nel nord d’Italia. È costruita su molte isole e non ci sono strade, ma canali. Le persone si muovono a piedi o in barca. Di notte, Venezia è silenziosa e misteriosa.</p>` },
      { ex: { id: '1E2', type: 'gaps', title: 'Essere o avere?', lines: ['Io [[ho]] 25 anni.', 'Marco [[è]] italiano.', 'Noi [[siamo]] a Venezia.', 'Chiara [[ha]] 26 anni.', 'Tu [[sei]] studente.'] } },
      { ex: { id: '1E3', type: 'mc', title: 'Scelta multipla', shuffle: false,
        items: [{ q: 'Venezia è:', o: ['una montagna', 'una città'], a: 1 }, { q: 'Il Canal Grande è:', o: ['una strada', 'un ponte', 'un canale'], a: 2 }, { q: 'Le gondole sono:', o: ['case', 'barche', 'treni'], a: 1 }] } },
      { ex: { id: '1E4', type: 'select', title: 'Il verbo piacere', lines: ['Mi {{piace*|piacciono}} Venezia.', 'Mi {{piacciono*|piace}} i musei.', 'A Marco {{piacciono*|piace}} i misteri.', 'A Chiara {{piace*|piacciono}} la storia.', 'Ti {{piace*|piacciono}} viaggiare?'] } },
      { ex: { id: '1E5', type: 'match', title: 'Vocabolario: collega le parole',
        pairs: [['gondola', 'barca tipica di Venezia'], ['canale', '“strada” d’acqua'], ['ponte', 'passa sopra il canale'], ['piazza', 'spazio aperto in città']] } },
      { ex: { id: '1E6', type: 'open', title: 'Produzione scritta: scrivi 3 frasi', prompts: ['Mi chiamo…', 'Ho … anni.', 'Mi piace / Mi piacciono…'],
        model: 'Mi chiamo Sofia.\nHo 24 anni.\nMi piacciono le città antiche e mi piace molto Venezia.' } }
    ],
    F: [
      { html: '<p class="note">Leggi il fumetto. Riesci a capire tutto?</p>' },
      { img: I('u1-fumetto'), alt: 'Fumetto: Roberto e Natalia a Venezia', size: 'comic' }
    ]
  },

  2: {
    A: [
      { img: I('u2-personaggi-1'), alt: 'Sette personaggi numerati da 1 a 7', size: 'full', white: true },
      { ex: { id: '2A1', type: 'match', title: 'Descrivi questi personaggi', hint: 'Trascina il numero del personaggio accanto alla descrizione.', bankLabel: 'Personaggi',
        pairs: [['È anziano', '3'], ['È atletico', '4'], ['È basso', '2'], ['È bionda', '6'], ['È calvo', '5'], ['Porta gli occhiali', '7'], ['È magra', '1']], compact: true } },
      { html: `<div class="box"><h4>Descrivere l’aspetto fisico in italiano</h4>
        <dl class="defs">
          <dt>Essere</dt><dd>caratteristiche permanenti o essenziali: nazionalità, professione, tratti fisici generali, personalità.</dd>
          <dt>Avere</dt><dd>parti del corpo, caratteristiche fisiche specifiche, età.</dd>
          <dt>Portare</dt><dd>qualcosa che si ha addosso in modo abituale (acconciatura, occhiali, barba, accessori). Anche per i profumi: <i>porta un profumo delicato</i>.</dd>
          <dt>Indossare</dt><dd>vestiti e accessori, spesso quelli di un dato momento.</dd>
        </dl>
        <p class="examples-p"><i>Luca è alto e magro. Ha gli occhi verdi e porta la barba. Oggi indossa una giacca di pelle.</i><br>
        <i>Maria è italiana. Ha i capelli ricci e porta gli occhiali da sole. Oggi indossa un vestito elegante.</i></p></div>` },
      { ex: { id: '2A2', type: 'select', title: 'Essere, avere, portare o indossare?',
        lines: ['Luca {{è*|ha|porta}} alto e magro.', 'Luca {{ha*|è|indossa}} gli occhi verdi.', 'Luca {{porta*|è|ha}} la barba.', 'Oggi Luca {{indossa*|è|ha}} una giacca di pelle.', 'Maria {{ha*|è|porta}} i capelli ricci.', 'Maria {{è*|ha|indossa}} italiana.'] } },
      { img: I('u2-ladro'), alt: 'Marco parla con una signora', size: 'l' },
      { html: `<div class="dialogue">
        ${say('Signora', 'Scusi… ho visto l’uomo che ha rubato la borsa.')}
        ${say('Marco', 'Davvero? Com’è?')}
        ${say('Signora', 'È un giovane alto e magro. Ha i capelli scuri, un po’ lunghi e mossi. Gli occhi sono chiari, tra il verde e l’azzurro. Non porta gli occhiali né la barba. È elegante: camicia bianca e gilet scuro. Sembra molto sicuro di sé.')}
        ${say('Marco', 'Capisco… grazie. Lo troverò.')}
        </div>` },
      { img: I('u2-personaggi-2'), alt: 'Sette sospettati numerati da 1 a 7', size: 'full', white: true },
      { ex: { id: '2A3', type: 'mc', title: 'Chi è secondo te il ladro?', shuffle: false, row: true,
        items: [{ q: 'Leggi la descrizione della signora e scegli il numero.', o: ['1', '2', '3', '4', '5', '6', '7'], a: 3,
          why: 'È il numero 4: alto e magro, capelli scuri e mossi, camicia bianca e gilet scuro.' }] } },
      { ex: { id: '2A4', type: 'select', title: 'Descrivi gli altri personaggi',
        lines: ['Il personaggio 1 porta una giacca di {{pelle*|lana}}.', 'Il personaggio 2 è {{calvo*|biondo}}.', 'Il personaggio 5 ha i capelli {{lunghi e biondi*|corti e neri}}.',
          'Il personaggio 6 ha i capelli {{neri e lunghi*|biondi e corti}}.', 'Il personaggio 7 è {{anziano*|giovane}} ed {{elegante*|sportivo}}.'] } },
      { ex: { id: '2A5', type: 'open', title: 'Prova a descrivere un tuo amico o amica', prompts: ['Com’è fisicamente?', 'Che cosa porta di solito? Che cosa indossa oggi?'],
        model: 'La mia amica Giulia è alta e magra. Ha i capelli ricci e gli occhi castani.\nPorta sempre gli occhiali. Oggi indossa un vestito rosso.' } }
    ],
    B: [
      { img: I('u2-roberto-natalia'), alt: 'Roberto e Natalia', size: 'm', float: 'right' },
      { html: `<h3>Osserva i personaggi e leggi le loro caratteristiche</h3>
        <p><b class="name">Roberto</b> è un ricercatore argentino. È curioso e gli piace scoprire cose nuove. Osserva la città, fa molte domande e cerca sempre la verità. È coraggioso: anche quando ha paura, cerca di aiutare gli altri. È anche un amico leale e generoso, sempre pronto a difendere Alessio e Laura. Con Natalia è romantico, ma all’inizio è un po’ timido. Per lui, l’amore e l’amicizia sono molto importanti.</p>
        <p><b class="name">Natalia</b> è una donna veneziana intelligente, dolce e misteriosa. All’inizio non parla molto di sé e non racconta tutti i suoi segreti. Con Roberto, però, è affettuosa e romantica. È anche coraggiosa e sa mantenere la calma nei momenti difficili. Ama Venezia e usa i suoi poteri magici per proteggere la città e i suoi amici. Ha anche un lato allegro: le piace scherzare, ridere e passare il tempo in buona compagnia.</p>` },
      { ex: { id: '2B1', type: 'mc', title: 'Chi scelgo come compagno d’avventura?', shuffle: false,
        hint: 'Sei a Venezia e hai bisogno di aiuto! In alcuni casi sono possibili risposte diverse.',
        items: [
          { q: 'Trovo un simbolo misterioso su un muro. Voglio scoprire che cosa significa.', o: ['Roberto', 'Natalia', 'Tutti e due'], a: [0, 1, 2], why: 'Roberto è curioso; Natalia conosce i segreti di Venezia.' },
          { q: 'Sono molto nervoso. Ho bisogno di una persona calma.', o: ['Roberto', 'Natalia', 'Tutti e due'], a: 1, why: 'Natalia sa mantenere la calma nei momenti difficili.' },
          { q: 'Organizzo una cena e voglio invitare qualcuno che ama ridere e scherzare.', o: ['Roberto', 'Natalia', 'Tutti e due'], a: 1, why: 'A Natalia piace scherzare e ridere.' },
          { q: 'Devo attraversare un luogo pericoloso per aiutare un amico.', o: ['Roberto', 'Natalia', 'Tutti e due'], a: [0, 1, 2], why: 'Sono coraggiosi tutti e due.' },
          { q: 'Voglio conoscere meglio una persona, ma lei parla poco di sé. Con chi sto parlando?', o: ['Roberto', 'Natalia', 'Tutti e due'], a: 1, why: 'Natalia non parla molto di sé.' },
          { q: 'Mi piace una ragazza, ma sono timido. Chi può capire come mi sento?', o: ['Roberto', 'Natalia', 'Tutti e due'], a: 0, why: 'Con Natalia, all’inizio Roberto è un po’ timido.' }] } },
      { img: I('u2-alice'), alt: 'Alice', size: 'xs', float: 'left' },
      { html: `<h3>Alice e Marco</h3>
        <p>Mi chiamo Alice e ho un carattere forte. Sono curiosa, determinata e anche affettuosa. Mi piacciono l’astrologia, i misteri e le serate tranquille con un buon libro. Il mio ragazzo Marco è un detective intelligente e protettivo. Gli voglio molto bene, ma non mi piace il suo disordine: lascia foto e appunti sul tavolo e il cappotto sulla sedia. Inoltre, lavora spesso di notte e io vorrei passare più tempo con lui. A volte gli dico: «Marco, sai trovare i ladri… adesso trova un posto per il tuo cappotto!».</p>` },
      { ex: { id: '2B2', type: 'tf', title: 'Vero o falso?',
        items: [['Alice ha un carattere forte ed è determinata.', true], ['Ad Alice non piacciono i libri sui misteri.', false], ['Alice ama le serate tranquille con un buon libro.', true],
          ['Marco è un detective intelligente e protettivo.', true], ['Marco mette sempre il cappotto nell’armadio.', false], ['Alice è contenta del disordine in casa.', false],
          ['Marco lavora spesso di notte.', true], ['Alice vuole passare meno tempo con Marco.', false]] } },
      { img: I('u2-zodiaco'), alt: 'La ruota dello zodiaco', size: 'xs', float: 'right' },
      { html: `<h3>Carattere e zodiaco</h3><p>I segni dello zodiaco descrivono diversi tipi di carattere. Ogni persona ha un segno secondo la sua data di nascita.</p>
        <details class="reveal"><summary>Leggi le descrizioni dei segni</summary>
        <ul class="zodiac"><li><b>Ariete</b> è una persona attiva e coraggiosa. Gli piace iniziare cose nuove.</li><li><b>Toro</b> è tranquillo e paziente. Gli piacciono la stabilità e il comfort.</li>
        <li><b>Gemelli</b> è curioso e socievole. Parla molto e impara velocemente.</li><li><b>Cancro</b> è sensibile e familiare. Si prende cura delle persone che ama.</li>
        <li><b>Leone</b> è forte e sicuro. Gli piace essere al centro dell’attenzione.</li><li><b>Vergine</b> è organizzata e responsabile. Fa attenzione ai dettagli.</li>
        <li><b>Bilancia</b> è gentile e cerca equilibrio. Ama la pace e l’armonia.</li><li><b>Scorpione</b> è intenso e misterioso. Ha emozioni profonde.</li>
        <li><b>Sagittario</b> è ottimista e avventuroso. Gli piace viaggiare e imparare.</li><li><b>Capricorno</b> è lavoratore e serio. Pensa sempre al futuro.</li>
        <li><b>Acquario</b> è originale e indipendente. Ha idee diverse.</li><li><b>Pesci</b> è sognatore e creativo. È molto sensibile e gentile.</li></ul></details>` },
      { ex: { id: '2B3', type: 'match', title: 'Abbina segno e carattere', hint: 'Prova prima senza leggere le descrizioni!',
        pairs: [['Ariete', 'attivo e coraggioso'], ['Toro', 'tranquillo e paziente'], ['Gemelli', 'curioso e socievole'], ['Cancro', 'sensibile e familiare'], ['Leone', 'forte e sicuro'], ['Vergine', 'organizzata e responsabile'],
          ['Bilancia', 'gentile, cerca equilibrio'], ['Scorpione', 'intenso e misterioso'], ['Sagittario', 'ottimista e avventuroso'], ['Capricorno', 'lavoratore e serio'], ['Acquario', 'originale e indipendente'], ['Pesci', 'sognatore e creativo']] } },
      { ex: { id: '2B4', type: 'open', title: 'Qual è il tuo segno zodiacale?', prompts: ['Qual è il tuo segno? Sei d’accordo con la descrizione? Perché?'],
        model: 'Sono del Sagittario. Sono d’accordo: sono ottimista e mi piace molto viaggiare, ma non sono sempre avventuroso.' } }
    ],
    C: [
      { img: I('u2-napoli'), alt: 'Il golfo di Napoli con il Vesuvio', size: 's', float: 'right' },
      { html: `<h3>Cosa sai di Napoli?</h3>
        <p>Napoli è una città molto famosa nel sud d’Italia. Si trova vicino al mare, nel Golfo di Napoli, e ha una storia molto lunga e interessante. È una delle città più antiche d’Europa e conserva molte tradizioni.</p>
        <p>La città è conosciuta per il vulcano Vesuvio, che si trova vicino. Questo vulcano è molto famoso nella storia. Napoli ha anche un centro storico molto grande, con strade strette, chiese antiche e piazze belle.</p>
        <p>La cucina napoletana è molto famosa in tutto il mondo. La pizza nasce a Napoli e la pizza margherita è il piatto più tipico. A Napoli si mangiano anche pasta, pesce e dolci tradizionali.</p>
        <p>I napoletani sono persone calorose, aperte e simpatiche. Amano parlare, stare insieme e vivere la vita con passione. Il calcio è molto importante per loro, e la squadra della città è molto amata.</p>` },
      { html: `<div class="box"><h4>Tre curiosità sui napoletani</h4>
        <p><b>Il culto di San Gennaro.</b> I napoletani sono molto devoti a San Gennaro, il patrono della città. Tre volte all’anno, nella Cattedrale di Napoli, si svolge il rito della liquefazione del suo sangue. Se il sangue non si scioglie, la tradizione popolare lo considera un cattivo presagio.</p>
        <p><b>Il caffè sospeso.</b> Chi può permetterselo paga due caffè al bar, ma ne beve uno solo: il secondo resta “sospeso” per chi non può permetterselo.</p>
        <p><b>La passione per il calcio.</b> Quando il Napoli vince, la città si trasforma in una festa collettiva. Il legame con Maradona, considerato quasi un santo laico, è ancora profondissimo.</p></div>` },
      { ex: { id: '2C1', type: 'mc', title: 'Cosa hai capito?',
        items: [
          { q: 'Dove si trova Napoli?', o: ['Nel sud d’Italia, vicino al mare', 'Nel nord, in montagna', 'Su un’isola'] },
          { q: 'Qual è il piatto più tipico di Napoli?', o: ['La pizza margherita', 'Il risotto', 'La polenta'] },
          { q: 'Che cos’è il caffè sospeso?', o: ['Un caffè pagato per chi non può permetterselo', 'Un caffè bevuto in piedi', 'Un caffè freddo'] },
          { q: 'Chi è il patrono di Napoli?', o: ['San Gennaro', 'San Marco', 'San Pietro'] }] } },
      { img: I('u2-pizza-amici'), alt: 'Fabio e Marco mangiano la pizza', size: 's', float: 'left' },
      { html: `<h3>Dialogo</h3><div class="dialogue">
        ${say('Fabio', 'Ti piace Napoli?')}
        ${say('Marco', 'Sì, mi piace molto. È una città viva… e affascinante.')}
        ${say('Fabio', 'Eh, certo! E poi… la pizza è nata qui, a Napoli. La vera pizza napoletana è molto antica. Dicono che la pizza Margherita è stata creata per la regina Margherita… con i colori della bandiera italiana.')}
        ${say('Marco', 'Davvero? Non lo sapevo.')}
        ${say('Fabio', 'Sì, è una tradizione molto importante qui. Ma dimmi… che cosa fai a Napoli?')}
        ${say('Marco', 'Sto cercando un ladro.')}
        ${say('Fabio', '<i>(un sorriso leggero)</i> Capisco… allora buona fortuna con il tuo lavoro.')}
        </div>
        <div class="box"><h4>La storia della pizza</h4><p>La pizza è uno dei piatti più famosi del mondo, ma nasce a Napoli. All’inizio era un cibo semplice, mangiato soprattutto dalla gente povera: pane, pomodoro e poco altro. Da Napoli la pizza si diffonde in tutto il mondo e diventa un simbolo della cucina italiana.</p></div>` },
      { ex: { id: '2C2', type: 'tf', title: 'Vero o falso?',
        items: [['Napoli è una città tranquilla e noiosa.', false], ['A Marco piace Napoli.', true], ['La pizza nasce a Roma.', false], ['La pizza Margherita ha i colori della bandiera italiana.', true],
          ['Marco conosce già la storia della pizza.', false], ['Fabio parla della tradizione della pizza napoletana.', true], ['Marco è in vacanza a Napoli.', false],
          ['Marco sta cercando un ladro.', true], ['La pizza era un cibo dei ricchi all’inizio.', false], ['Fabio augura buona fortuna a Marco.', true]] } }
    ],
    D: [
      { img: I('u2-pronomi'), alt: 'I pronomi di complemento diretto', size: 'xs', float: 'right' },
      { html: `<h3>I pronomi di complemento diretto</h3>
        <p>Sostituiscono la persona o la cosa che riceve l’azione, per non ripetere. Rispondono a: <b>Chi? Che cosa?</b></p>
        <table class="conj"><tbody>
          <tr><td>mi → me</td><td><i>Il mio ragazzo mi ama.</i></td></tr><tr><td>ti → te</td><td><i>Io ti aspetto sempre.</i></td></tr>
          <tr><td>lo → lui / cosa</td><td><i>Marco? Lo vedo ogni giorno.</i></td></tr><tr><td>la → lei / cosa</td><td><i>Laura? La chiamo stasera.</i></td></tr>
          <tr><td>ci → noi</td><td><i>Il nostro amore ci rende felici.</i></td></tr><tr><td>vi → voi</td><td><i>Ragazzi, vi accompagno alla fermata?</i></td></tr>
          <tr><td>li → loro</td><td><i>I tuoi ex? Li ho dimenticati.</i></td></tr><tr><td>le → loro</td><td><i>Le tue amiche? Le invito alla cena.</i></td></tr>
        </tbody></table>
        <div class="box"><h4>Dove si mettono?</h4><ol>
          <li><b>Prima del verbo</b>: <i>Ti penso sempre. Lo guardo con amore.</i></li>
          <li><b>Dopo l’infinito, attaccato</b>: <i>Voglio vederti. Devo chiamarla.</i></li>
          <li><b>Con il passato prossimo</b>: <i>Ho visto Maria → L’ho vista.</i></li></ol>
          <p>Attenzione: non “io amo lei”, ma <b>La amo</b>. Non “lui vede me”, ma <b>Mi vede</b>.</p></div>` },
      { ex: { id: '2D1', type: 'bank', title: 'Prova tu', reuse: true, hint: 'Le parole si possono usare più volte.',
        lines: ['Marco? [[Lo]] vedo tutti i giorni.', 'Laura? [[La]] chiamo stasera.', 'I tuoi ex? [[Li]] hai dimenticati.', 'Le tue amiche? [[Le]] invito alla cena.', 'Noi due? Il destino [[ci]] unisce.'],
        chips: ['mi', 'ti', 'lo', 'la', 'ci', 'vi', 'li', 'le'] } },
      { ex: { id: '2D2', type: 'gaps', title: 'Esercizio 1: scegli il pronome corretto', hint: 'Esempio: Pietro? Lo conosco da bambino.',
        lines: ['Marco? [[Lo]] vedo tutti i giorni al bar.', 'Mia moglie? [[La]] amo da dieci anni.', 'Voi due? [[Vi]] accompagno alla stazione.', 'Le tue ex ragazze? Non [[le]] saluto più.',
          'Io e te? Nessuno [[ci]] capisce.', 'A volte [[mi]] guardo allo specchio e [[mi]] chiedo: ma tu [[la]] ami ancora?'] } },
      { img: I('u2-caffe'), alt: 'Roberto beve un caffè', size: 'xs', float: 'right' },
      { ex: { id: '2D3', type: 'bank', title: 'Esercizio 2: scegli tra mi, ti, lo, la, ci, vi, li, le', reuse: true,
        lines: ['Luca è il mio fidanzato. [[Lo]] amo tantissimo.', 'Marta è la mia ragazza. [[La]] chiamo ogni sera.', 'Io e Giulia? [[Ci]] siamo lasciati ieri.',
          'Voi due litigate sempre. Non [[vi]] sopporto più!', 'I tuoi ex? [[Li]] hai dimenticati?', 'Le tue promesse? Non [[ci]] credo più.'],
        chips: ['mi', 'ti', 'lo', 'la', 'ci', 'vi', 'li', 'le'] } },
      { ex: { id: '2D4', type: 'gaps', title: 'Esercizio 3: trasforma la frase', hint: 'Esempio: Vedo Marco → Lo vedo.',
        lines: ['Chiamo la mia fidanzata. → [[La]] chiamo.', 'Aspetto te. → [[Ti]] aspetto.', 'Ho incontrato i miei suoceri. → [[Li]] ho incontrati.', 'Saluto le mie colleghe di lavoro. → [[Le]] saluto.'] } },
      { ex: { id: '2D5', type: 'bank', title: 'Esercizio 4: rispondi con un pronome', layout: 'list',
        lines: ['Bevi il cappuccino? → Sì, [[lo]] bevo.', 'Conosci Natalia? → Sì, [[la]] conosco.', 'Vedi Roberto e Marco? → Sì, [[li]] vedo.', 'Inviti Alice e Natalia? → Sì, [[le]] invito.'], extra: ['mi', 'ci'] } }
    ],
    E: [
      { ex: { id: '2E1', type: 'mc', title: '1. Aggettivi fisici', shuffle: false,
        items: [{ q: 'Maria ha i capelli molto ___.', o: ['simpatici', 'lunghi', 'gentili'], a: 1 }, { q: 'Luca è un uomo ___.', o: ['alto', 'paziente', 'timido'], a: 0 },
          { q: 'Anna ha gli occhi ___.', o: ['verdi', 'generosi', 'intelligenti'], a: 0 }, { q: 'Marco è ___ e magro.', o: ['creativo', 'basso', 'socievole'], a: 1 }] } },
      { ex: { id: '2E2', type: 'bank', title: '2. Aggettivi di carattere',
        lines: ['Paolo non parla molto. È molto [[timido]].', 'Marta aiuta tutti. È molto [[generoso|generosa]].', 'Giulia ha molti amici. È [[socievole]].', 'Il professore non ride mai. È [[serio]].', 'Luca è molto divertente. È [[simpatico]].'],
        tip: 'Per Marta si dice generosa: l’aggettivo si accorda con la persona.' } },
      { ex: { id: '2E3', type: 'mc', title: '3. Pronomi di complemento diretto', shuffle: false,
        items: [{ q: 'Io ___ amo. (te)', o: ['ti', 'mi', 'lo'], a: 0 }, { q: 'Marco ___ vede ogni giorno. (Maria)', o: ['li', 'la', 'le'], a: 1 },
          { q: 'Noi ___ invitiamo alla festa. (voi)', o: ['ci', 'vi', 'li'], a: 1 }, { q: 'Io ___ capisco. (lui)', o: ['lo', 'la', 'li'], a: 0 }] } },
      { ex: { id: '2E4', type: 'gaps', title: '4. Trasformazione con pronome', lines: ['Vedo Maria → [[La]] vedo.', 'Chiamo i miei amici → [[Li]] chiamo.', 'Aiuto te → [[Ti]] aiuto.', 'Incontro Luca → [[Lo]] incontro.'] } },
      { ex: { id: '2E5', type: 'gaps', title: '5. Passato prossimo', hint: 'Completa con il pronome e il verbo avere.',
        lines: ['Ho visto Maria → [[L’ho]] vista.', 'Ho incontrato i ragazzi → [[Li ho]] incontrati.', 'Ho chiamato Laura → [[L’ho]] chiamata.', 'Ho salutato le amiche → [[Le ho]] salutate.'] } },
      { img: I('u2-vesuvio'), alt: 'Il Vesuvio sopra Napoli', size: 'xs', float: 'right' },
      { ex: { id: '2E7', type: 'bank', title: '7. Completa il testo con le parole del riquadro',
        lines: ['Il [[Vesuvio]] è un [[vulcano]] molto [[famoso]] vicino a [[Napoli]].', 'È uno dei vulcani più conosciuti del mondo.', 'Molti anni fa, durante una grande [[eruzione]], il vulcano ha lanciato [[lava]] e cenere.',
          'L’antica [[città]] di Pompei è stata completamente [[distrutta]].', 'Oggi il Vesuvio è ancora attivo, ma è anche un luogo molto visitato dai turisti.'] } },
      { ex: { id: '2E8', type: 'bank', title: '8. Completa il dialogo', layout: 'dialogue',
        lines: ['A: Hai [[visto]] Marco?', 'B: Sì, [[lo|l’]] ho incontrato [[ieri]].', 'A: Com’è la sua nuova amica?', 'B: È molto [[simpatica]].', 'A: Dove siete andati?', 'B: [[siamo]] andati in centro. Poi abbiamo parlato di [[Napoli]].'],
        tip: 'Davanti a ho si scrive l’: L’ho incontrato.' } },
      { ex: { id: '2E6', type: 'open', title: '6. Produzione scritta', hint: 'Scrivi 5–6 frasi su una persona (partner o amico). Usa 2 aggettivi fisici, 2 di carattere e 1 pronome diretto.',
        prompts: ['La persona che descrivo…'], model: 'Il mio ragazzo è alto e ha i capelli scuri. È simpatico e gentile. Io lo amo molto.' } },
      { ex: { id: '2E9', type: 'open', title: '9. Parla di te', prompts: ['Io sono…', 'I miei amici dicono che sono…', 'Ieri ho…', 'Una persona che conosco bene è…', 'Mi piace … perché …'],
        model: 'Io sono Sofia, sono argentina.\nI miei amici dicono che sono allegra e curiosa.\nIeri ho visto un film con mia sorella.\nUna persona che conosco bene è mio fratello: è alto e molto simpatico.\nMi piace Napoli perché è una città viva.' } }
    ],
    F: [
      { html: '<p class="note">Leggi il fumetto. Riesci a capire tutto?</p>' },
      { img: I('u2-fumetto'), alt: 'Fumetto: Roberto e Marco nel parco', size: 'comic' }
    ]
  }
};
