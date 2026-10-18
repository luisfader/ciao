/* Esercizi dei test, tratti dalle attività e dalle soluzioni del manuale.
   Tipi:
   choice  { q, s?, o:[...], a:index }          scelta multipla (s = frase con ___)
   tf      { q?, ctx?, s, a:true|false }         vero o falso
   type    { q, s, a:[risposte accettate] }      scrivi la risposta
   build   { q, a:'frase corretta', alt?:[...], extra:[...] } riordina le parole
   order   { q, a:[passaggi in ordine] }          riordina i passaggi
   match   { q, pairs:[[sinistra, destra], ...] } abbina le coppie
   Campo facoltativo: tip = spiegazione mostrata dopo la risposta.
   Ascolto: audio = nome del file in assets/audio/ (senza .mp3), tr = testo registrato,
   listen = true se l'esercizio si può fare solo ascoltando (si salta se il file manca). */
window.CIAO = window.CIAO || {};

CIAO.quizzes = {
  1: [
    { t: 'choice', q: 'Scegli il verbo giusto', s: 'Io ___ 25 anni.', o: ['ho', 'sono', 'ha', 'è'], a: 0, tip: 'Per l’età si usa avere: Ho 25 anni.' },
    { t: 'choice', q: 'Completa con piacere', s: 'Mi ___ i musei.', o: ['piacciono', 'piace', 'piaci'], a: 0, tip: 'Mi piacciono + plurale.' },
    { t: 'type', q: 'Scrivi la forma di essere', s: 'Noi ___ a Venezia.', a: ['siamo'] },
    { t: 'choice', q: 'Completa con piacere', s: 'A Chiara ___ la storia.', o: ['piace', 'piacciono', 'piaci'], a: 0 },
    { t: 'type', q: 'Scrivi la forma di essere', s: 'Tu ___ studente.', a: ['sei'] },
    { t: 'tf', ctx: 'Venezia: città di misteri', s: 'Venezia si trova nel sud dell’Italia.', a: false, tip: 'Venezia si trova nel nord del paese.' },
    { t: 'tf', ctx: 'Venezia: città di misteri', s: 'La città è costruita su più di 100 isole.', a: true },
    { t: 'tf', ctx: 'Venezia: città di misteri', s: 'Di notte Venezia è rumorosa.', a: false, tip: 'Di notte le strade sono silenziose.' },
    { t: 'match', q: 'Abbina le parole', pairs: [['gondola', 'barca tipica di Venezia'], ['canale', '“strada” d’acqua'], ['ponte', 'passa sopra il canale'], ['piazza', 'spazio aperto in città']] },
    { t: 'choice', q: 'Incontro a Venezia: chi è detective?', o: ['Marco', 'Franco', 'Roberto', 'Chiara'], a: 0 },
    { t: 'choice', q: 'Incontro a Venezia: chi è argentino?', o: ['Roberto', 'Marco', 'Franco', 'Natalia'], a: 0, tip: 'Roberto: «Sono Roberto, argentino. Sono archeologo.»' },
    { t: 'choice', q: 'Come si dice in italiano?', o: ['Ho 25 anni', 'Sono 25 anni', 'Ho 25 anni vecchio'], a: 0 },
    { t: 'choice', q: 'Il Canal Grande è…', o: ['un canale', 'una strada', 'un ponte'], a: 0 },
    { t: 'match', q: 'Abbina i personaggi famosi', pairs: [['Leonardo da Vinci', 'ha dipinto la Gioconda'], ['Michelangelo', 'ha scolpito il David'], ['Dante Alighieri', 'ha scritto la Divina Commedia'], ['Cristoforo Colombo', 'ha attraversato l’Atlantico']] },
    { t: 'choice', q: 'Il pronome «gli» corrisponde a…', o: ['a lui', 'a lei', 'a me', 'a te'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Mi piacciono le città antiche', alt: ['Le città antiche mi piacciono'], extra: ['piace', 'il'] },
    { t: 'build', q: 'Riordina la frase', a: 'Preferisco il tè al caffè', extra: ['piace', 'la'] },
    // ---- ascolto (file in assets/audio/) ----
    { t: 'type', listen: true, audio: 'u1-01', voice: 'donna', tr: 'Mi chiamo Chiara.', q: 'Ascolta e scrivi', a: ['Mi chiamo Chiara'] },
    { t: 'type', listen: true, audio: 'u1-02', voice: 'uomo', tr: 'Ho venticinque anni.', q: 'Ascolta e scrivi', a: ['Ho venticinque anni', 'Ho 25 anni'] },
    { t: 'type', listen: true, audio: 'u1-03', voice: 'donna', tr: 'Mi piacciono i musei.', q: 'Ascolta e scrivi', a: ['Mi piacciono i musei'] },
    { t: 'type', listen: true, audio: 'u1-04', voice: 'uomo', tr: 'Venezia è misteriosa.', q: 'Ascolta e scrivi', a: ['Venezia è misteriosa'] },
    { t: 'choice', listen: true, audio: 'u1-05', voice: 'donna', tr: 'Ti piace viaggiare?', q: 'Ascolta e scegli la frase che senti', o: ['Ti piace viaggiare?', 'Mi piace viaggiare.', 'Gli piace viaggiare.'], a: 0 },
    { t: 'choice', listen: true, audio: 'u1-06', voice: 'uomo', tr: 'Le piacciono i misteri.', q: 'Ascolta e scegli la frase che senti', o: ['Le piacciono i misteri.', 'Gli piacciono i misteri.', 'Le piace il mistero.'], a: 0 },
    { t: 'build', listen: true, audio: 'u1-07', voice: 'donna', tr: 'Preferisco il tè al caffè.', q: 'Ascolta e riordina', a: 'Preferisco il tè al caffè', extra: ['piace', 'la'] },
    { t: 'build', listen: true, audio: 'u1-08', voice: 'uomo', tr: 'Le gondole sono un simbolo di Venezia.', q: 'Ascolta e riordina', a: 'Le gondole sono un simbolo di Venezia', extra: ['è', 'barche'] },
    { t: 'choice', listen: true, audio: 'u1-09', voice: 'donna', tr: 'Salve, mi chiamo Chiara. Sono insegnante di storia.', q: 'Ascolta Chiara: che lavoro fa?', o: ['È insegnante di storia', 'È detective', 'È informatica', 'È archeologa'], a: 0 },
    { t: 'choice', listen: true, audio: 'u1-11', voice: 'uomo', tr: 'Ciao! Io sono Franco. Ho venticinque anni e lavoro come informatico.', q: 'Ascolta Franco: quanti anni ha?', o: ['25', '35', '26', '29'], a: 0 },
    { t: 'tf', listen: true, audio: 'u1-10', voice: 'donna', tr: 'Venezia si trova nel nord d’Italia. Non ci sono strade, ma canali. Le persone si muovono a piedi o in barca.', ctx: 'Ascolta il testo', s: 'A Venezia le persone si muovono in macchina.', a: false }
  ],

  2: [
    { t: 'choice', q: 'Scegli l’aggettivo giusto', s: 'Maria ha i capelli molto ___.', o: ['lunghi', 'simpatici', 'gentili'], a: 0 },
    { t: 'choice', q: 'Scegli l’aggettivo giusto', s: 'Anna ha gli occhi ___.', o: ['verdi', 'generosi', 'intelligenti'], a: 0 },
    { t: 'choice', q: 'Scegli l’aggettivo giusto', s: 'Paolo non parla molto. È molto ___.', o: ['timido', 'socievole', 'simpatico', 'generoso'], a: 0 },
    { t: 'choice', q: 'Scegli l’aggettivo giusto', s: 'Giulia ha molti amici. È ___.', o: ['socievole', 'serio', 'timido', 'basso'], a: 0 },
    { t: 'choice', q: 'Scegli il verbo giusto', s: 'Luca ___ alto e magro.', o: ['è', 'ha', 'porta', 'indossa'], a: 0, tip: 'Essere per i tratti fisici generali.' },
    { t: 'choice', q: 'Scegli il verbo giusto', s: 'Oggi Marco ___ una giacca di pelle.', o: ['indossa', 'è', 'ha'], a: 0, tip: 'Indossare per i vestiti che si mettono in un dato momento.' },
    { t: 'choice', q: 'Scegli il pronome (te)', s: 'Io ___ amo.', o: ['ti', 'mi', 'lo'], a: 0 },
    { t: 'choice', q: 'Scegli il pronome (Maria)', s: 'Marco ___ vede ogni giorno.', o: ['la', 'li', 'le'], a: 0 },
    { t: 'type', q: 'Sostituisci con il pronome', s: 'Vedo Maria → ___ vedo.', a: ['la'] },
    { t: 'type', q: 'Sostituisci con il pronome', s: 'Chiamo i miei amici → ___ chiamo.', a: ['li'] },
    { t: 'choice', q: 'Ho visto Maria →', o: ['L’ho vista', 'L’ho visto', 'Li ho visti'], a: 0, tip: 'Con lo/la il participio si accorda: vista.' },
    { t: 'choice', q: 'Ho salutato le amiche →', o: ['Le ho salutate', 'Li ho salutati', 'L’ho salutata'], a: 0 },
    { t: 'tf', ctx: 'La storia della pizza', s: 'La pizza nasce a Roma.', a: false, tip: 'La pizza nasce a Napoli.' },
    { t: 'tf', ctx: 'Dialogo tra Fabio e Marco', s: 'Marco sta cercando un ladro.', a: true },
    { t: 'tf', ctx: 'Il testo di Alice', s: 'Alice vuole passare meno tempo con Marco.', a: false, tip: 'Alice vorrebbe passare più tempo con lui.' },
    { t: 'match', q: 'Abbina segno e carattere', pairs: [['Ariete', 'attivo e coraggioso'], ['Toro', 'tranquillo e paziente'], ['Gemelli', 'curioso e socievole'], ['Pesci', 'sognatore e creativo']] },
    { t: 'choice', q: 'Che cos’è il caffè sospeso?', o: ['Un caffè pagato per chi non può permetterselo', 'Un caffè bevuto in piedi al bar', 'Un caffè freddo d’estate'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Lo guardo con amore', extra: ['Gli', 'di'] },
    // ---- ascolto (file in assets/audio/) ----
    { t: 'type', listen: true, audio: 'u2-01', voice: 'donna', tr: 'Luca è alto e magro.', q: 'Ascolta e scrivi', a: ['Luca è alto e magro'] },
    { t: 'type', listen: true, audio: 'u2-02', voice: 'uomo', tr: 'Ha gli occhi verdi.', q: 'Ascolta e scrivi', a: ['Ha gli occhi verdi'] },
    { t: 'type', listen: true, audio: 'u2-03', voice: 'donna', tr: 'Porta gli occhiali.', q: 'Ascolta e scrivi', a: ['Porta gli occhiali'] },
    { t: 'type', listen: true, audio: 'u2-04', voice: 'uomo', tr: 'Il Vesuvio è un vulcano molto famoso.', q: 'Ascolta e scrivi', a: ['Il Vesuvio è un vulcano molto famoso'] },
    { t: 'choice', listen: true, audio: 'u2-05', voice: 'donna', tr: 'La chiamo stasera.', q: 'Ascolta e scegli la frase che senti', o: ['La chiamo stasera.', 'Le chiamo stasera.', 'Lo chiamo stasera.'], a: 0 },
    { t: 'choice', listen: true, audio: 'u2-06', voice: 'uomo', tr: 'Li ho visti ieri al bar.', q: 'Ascolta e scegli la frase che senti', o: ['Li ho visti ieri al bar.', 'L’ho visto ieri al bar.', 'Le ho viste ieri al bar.'], a: 0 },
    { t: 'build', listen: true, audio: 'u2-07', voice: 'donna', tr: 'Io ti aspetto sempre.', q: 'Ascolta e riordina', a: 'Io ti aspetto sempre', extra: ['mi', 'te'] },
    { t: 'build', listen: true, audio: 'u2-08', voice: 'uomo', tr: 'Paolo non parla molto ed è timido.', q: 'Ascolta e riordina', a: 'Paolo non parla molto ed è timido', extra: ['ha', 'simpatico'] },
    { t: 'choice', listen: true, audio: 'u2-09', voice: 'donna', tr: 'È un giovane alto e magro. Ha i capelli scuri, un po’ lunghi e mossi. Gli occhi sono chiari, tra il verde e l’azzurro. Non porta gli occhiali né la barba. È elegante: camicia bianca e gilet scuro. Sembra molto sicuro di sé.', q: 'La signora descrive il ladro. Com’è vestito?', o: ['Camicia bianca e gilet scuro', 'Giacca di pelle nera', 'Maglietta verde e jeans'], a: 0 },
    { t: 'choice', listen: true, audio: 'u2-09', q: 'La signora descrive il ladro. Com’è?', o: ['Giovane, alto e magro', 'Anziano e calvo', 'Basso e porta gli occhiali'], a: 0 },
    { t: 'choice', listen: true, audio: 'u2-10', voice: 'uomo', tr: 'Ma dimmi, che cosa fai a Napoli? — Sto cercando un ladro.', q: 'Fabio fa una domanda a Marco. Che cosa fa Marco a Napoli?', o: ['Sta cercando un ladro', 'È in vacanza', 'Mangia la pizza con gli amici'], a: 0 },
  ],

  3: [
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Quando ero piccolo, io ___ sempre al parco.', o: ['giocavo', 'ho giocato', 'gioco'], a: 0, tip: 'Abitudine nel passato → imperfetto.' },
    { t: 'type', q: 'Scrivi l’imperfetto di andare', s: 'Ogni estate noi ___ al mare.', a: ['andavamo'] },
    { t: 'type', q: 'Scrivi l’imperfetto di avere', s: 'Da bambino ___ molti amici.', a: ['avevo'] },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Mia nonna ___ storie ogni sera.', o: ['raccontava', 'raccontavo', 'raccontavano'], a: 0 },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Noi ___ vicino al mare.', o: ['vivevamo', 'vivevate', 'vivevano'], a: 0 },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Voi ___ spesso al cinema?', o: ['andavate', 'andavamo', 'andavi'], a: 0 },
    { t: 'match', q: 'Abbina l’infinito all’imperfetto (io)', pairs: [['essere', 'ero'], ['fare', 'facevo'], ['dire', 'dicevo'], ['dormire', 'dormivo']] },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Mentre io studiavo, lui ___.', o: ['è entrato', 'entrava'], a: 0, tip: 'Un’azione puntuale interrompe un’azione in corso: passato prossimo.' },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Il cane ___ molto oggi.', o: ['ha dormito', 'dormiva'], a: 0 },
    { t: 'type', q: 'Trasforma al passato', s: 'Oggi vivo in città → Prima ___ in città.', a: ['vivevo'] },
    { t: 'tf', ctx: 'Il racconto di Natalia', s: 'Natalia viveva a Roma.', a: false, tip: 'Natalia viveva a Venezia, vicino a un canale stretto.' },
    { t: 'tf', ctx: 'Il racconto di Natalia', s: 'La madre di Natalia preparava il pane.', a: true },
    { t: 'tf', ctx: 'Le preferenze dei bambini', s: 'Prima i bambini preferivano animali esotici.', a: false, tip: 'Una volta preferivano animali tranquilli.' },
    { t: 'match', q: 'Abbina i simboli di Roma', pairs: [['il Colosseo', 'anfiteatro antico'], ['la Fontana di Trevi', 'si lancia una moneta'], ['la lupa romana', 'fondazione di Roma'], ['il Vaticano', 'luogo religioso']] },
    { t: 'choice', q: 'Perché i turisti lanciano una moneta nella Fontana di Trevi?', o: ['Per tornare a Roma un giorno', 'Per pagare l’ingresso', 'Per trovare l’amore'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Quando ero piccola Venezia era diversa', alt: ['Venezia era diversa quando ero piccola'], extra: ['sono', 'è'] }
  ],

  4: [
    { t: 'type', q: 'Scrivi il condizionale di volere', s: 'Io ___ un caffè.', a: ['vorrei'] },
    { t: 'choice', q: 'Scegli il condizionale', s: 'Tu ___ aiutarmi?', o: ['potresti', 'potrei', 'potrebbe'], a: 0 },
    { t: 'type', q: 'Scrivi il condizionale di andare', s: 'Noi ___ a Firenze.', a: ['andremmo'] },
    { t: 'choice', q: 'Scegli il condizionale', s: 'Lei ___ studiare di più.', o: ['dovrebbe', 'dovresti', 'dovrei'], a: 0 },
    { t: 'choice', q: 'Scegli il condizionale', s: 'Loro ___ con noi.', o: ['verrebbero', 'venirebbero', 'verrebbe'], a: 0 },
    { t: 'type', q: 'Trasforma in un consiglio', s: 'Devi lavorare → ___ lavorare.', a: ['dovresti'] },
    { t: 'choice', q: 'Qual è la forma più gentile?', o: ['Potrei entrare?', 'Entro!'], a: 0 },
    { t: 'choice', q: 'Condizionale di pagare (io)', o: ['pagherei', 'pagerei', 'pagarei'], a: 0, tip: '-care / -gare aggiungono h.' },
    { t: 'choice', q: 'Condizionale di mangiare (io)', o: ['mangerei', 'mangierei', 'mangiarei'], a: 0, tip: '-ciare / -giare perdono la i.' },
    { t: 'match', q: 'Abbina la frase all’uso', pairs: [['Vorrei un caffè', 'desiderio'], ['Potresti aiutarmi?', 'richiesta gentile'], ['Dovresti studiare di più', 'consiglio'], ['Sarebbe bello viaggiare', 'possibilità']] },
    { t: 'tf', ctx: 'Dialogo agli Uffizi', s: 'La Gioconda si trova agli Uffizi.', a: false, tip: 'La Gioconda è a Parigi, al Louvre.' },
    { t: 'tf', ctx: 'Dialogo agli Uffizi', s: 'Botticelli ha dipinto L’estate.', a: false, tip: 'Botticelli ha dipinto La Primavera: L’estate non esiste!' },
    { t: 'choice', q: 'Indovina il luogo: è un ponte antico e sopra ci sono piccoli negozi.', o: ['Ponte Vecchio', 'Duomo', 'Galleria degli Uffizi', 'Piazza della Signoria'], a: 0 },
    { t: 'choice', q: 'Con la gorgia toscana, «casa» può suonare come…', o: ['hasa', 'gasa', 'cassa'], a: 0 },
    { t: 'tf', ctx: 'L’accento toscano', s: 'L’italiano standard nasce in Toscana.', a: true },
    { t: 'build', q: 'Riordina la frase', a: 'Mi piacerebbe baciarti al tramonto', alt: ['Al tramonto mi piacerebbe baciarti'], extra: ['piace', 'baciare'] }
  ],

  5: [
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Alice ___ visitare una città d’arte.', o: ['voleva', 'volevano'], a: 0 },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Marco e Alice ___ viaggiare insieme.', o: ['volevano', 'voleva'], a: 0 },
    { t: 'type', q: 'Scrivi sapere all’imperfetto (io)', s: 'Quando ero piccolo, non ___ niente sugli Etruschi.', a: ['sapevo'] },
    { t: 'choice', q: 'Scegli la forma corretta', s: 'Noi ___ andare al mare, ma poi abbiamo scelto Pisa.', o: ['volevamo', 'volevo'], a: 0 },
    { t: 'type', q: 'Scrivi sapere al presente', s: 'Noi non ___ dove andare in vacanza.', a: ['sappiamo'] },
    { t: 'choice', q: 'Scegli sapere al presente', s: 'Voi ___ qualcosa su questa città?', o: ['sapete', 'sanno', 'sappiamo'], a: 0 },
    { t: 'choice', q: '«Ho saputo la notizia» significa…', o: ['Ho scoperto la notizia in quel momento', 'Conoscevo già la notizia'], a: 0 },
    { t: 'choice', q: 'Rispondi: «La Torre di Pisa è alta 56 metri.» — «___. L’ho studiato a scuola.»', o: ['Già lo sapevo', 'Non lo sapevo', 'Non voglio saperlo'], a: 0 },
    { t: 'choice', q: 'Perché la Torre di Pisa è famosa in tutto il mondo?', o: ['Perché è inclinata', 'Perché è molto alta', 'Perché ha 294 gradini'], a: 0 },
    { t: 'choice', q: 'Come si chiama la piazza principale di Siena?', o: ['Piazza del Campo', 'Piazza del Duomo', 'Piazza dei Priori'], a: 0 },
    { t: 'choice', q: 'Che cos’è il Palio di Siena?', o: ['Una corsa di cavalli', 'Una festa religiosa', 'Un mercato medievale'], a: 0 },
    { t: 'choice', q: 'Quale popolo costruì la Porta all’Arco a Volterra?', o: ['Gli Etruschi', 'I Romani', 'I Medievali'], a: 0 },
    { t: 'tf', ctx: 'Viaggiamo!', s: 'Laura è già stata a Roma due volte.', a: true },
    { t: 'tf', ctx: 'Viaggiamo!', s: 'A Laura piace molto la montagna.', a: false, tip: 'Laura preferisce le città.' },
    { t: 'match', q: 'I consigli di Alice: abbina persona e viaggio', pairs: [['tranquilla e riflessiva', 'la montagna'], ['ama il sole e la libertà', 'il mare'], ['curiosa e ama l’arte', 'una città'], ['vuole relax totale', 'una crociera'], ['ama l’avventura', 'in macchina']] },
    { t: 'build', q: 'Riordina la frase', a: 'Volevo chiederti una cosa', extra: ['Voglio', 'sapevo'] }
  ],

  6: [
    { t: 'choice', q: 'Imperativo (tu) di vestirsi', s: '___ elegante per uscire a Milano.', o: ['Vestiti', 'Vestirti', 'Ti vesti'], a: 0 },
    { t: 'type', q: 'Imperativo negativo (tu) di indossare', s: '___ scarpe sportive alla Scala.', a: ['non indossare'] },
    { t: 'choice', q: 'Imperativo formale (Lei) di entrare', s: 'Signore, ___ pure.', o: ['entri', 'entra', 'entrate'], a: 0 },
    { t: 'choice', q: 'Imperativo formale (Lei) di sedersi', s: '___ al suo posto.', o: ['Si sieda', 'Siediti', 'Sedetevi'], a: 0 },
    { t: 'choice', q: 'Imperativo (voi) negativo di fare', s: '___ rumore durante lo spettacolo.', o: ['Non fate', 'Non fare', 'Non faccia'], a: 0 },
    { t: 'choice', q: 'Alla Scala…', o: ['Non usare il telefono', 'Usa il telefono', 'Non usa il telefono'], a: 0 },
    { t: 'choice', q: 'Forma corretta con Lei', o: ['Prenda posto', 'Prendi posto', 'Prendete posto'], a: 0 },
    { t: 'type', q: 'Vietato! Scrivi l’imperativo negativo (tu)', s: '___ durante lo spettacolo!', a: ['non parlare'] },
    { t: 'match', q: 'Abbina l’infinito all’imperativo (tu)', pairs: [['parlare', 'parla'], ['prendere', 'prendi'], ['dormire', 'dormi'], ['dire', 'di’']] },
    { t: 'tf', ctx: 'Natalia e Alice al telefono', s: 'Lo spettacolo era alla Scala di Milano.', a: true },
    { t: 'tf', ctx: 'Natalia e Alice al telefono', s: 'A Roberto l’opera è piaciuta molto.', a: false, tip: 'Roberto non ama l’opera, ma gli è piaciuta la violoncellista.' },
    { t: 'tf', ctx: 'Natalia e Alice al telefono', s: 'La violoncellista si chiama come Natalia.', a: true },
    { t: 'choice', q: 'Dove si trovano le boutique dei grandi stilisti a Milano?', o: ['Nel Quadrilatero della moda', 'In Piazza San Marco', 'Al Palatino'], a: 0 },
    { t: 'choice', q: 'Negli anni 1970 Milano ebbe un’idea importante:', o: ['organizzare sfilate due volte all’anno', 'costruire il Teatro alla Scala', 'aprire la fabbrica della Fiat'], a: 0 },
    { t: 'choice', q: 'Dove si trova l’Ultima Cena di Leonardo?', o: ['Santa Maria delle Grazie', 'Il Duomo di Milano', 'Il Teatro alla Scala'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Spegni il telefono e accendi il cuore', extra: ['spegne', 'accende'] }
  ],

  7: [
    { t: 'choice', q: 'Imperativo irregolare (tu) di fare', s: '___ attenzione!', o: ['Fa’', 'Fare', 'Facevi'], a: 0 },
    { t: 'type', q: 'Imperativo irregolare (tu) di dire', s: '___ la verità!', a: ['di\''] },
    { t: 'choice', q: 'Imperativo (tu) di essere', s: '___ sincero!', o: ['Sii', 'Sei', 'Sia'], a: 0 },
    { t: 'choice', q: 'Imperativo (tu) di avere', s: '___ pazienza!', o: ['Abbi', 'Hai', 'Abbia'], a: 0 },
    { t: 'type', q: 'Trasforma all’imperativo negativo', s: 'Mangia! → ___!', a: ['non mangiare'] },
    { t: 'choice', q: 'Vai via! → forma negativa', o: ['Non andare via!', 'Non vai via!', 'Non va’ via!'], a: 0 },
    { t: 'type', q: 'Imperativo (tu) di tagliare', s: '___ il guanciale a striscioline piccole.', a: ['taglia'] },
    { t: 'choice', q: 'Secondo Laura, che cosa non si mette mai nella carbonara?', o: ['La panna', 'Il pecorino', 'Il guanciale', 'Il pepe nero'], a: 0 },
    { t: 'tf', ctx: 'La carbonara di Laura', s: 'Il guanciale è meglio della pancetta.', a: true },
    { t: 'tf', ctx: 'La carbonara di Laura', s: 'Si mette l’olio nella padella con il guanciale.', a: false, tip: 'Il guanciale fa il grasso da solo.' },
    { t: 'tf', ctx: 'La carbonara di Laura', s: 'La carbonara si mangia fredda.', a: false },
    { t: 'order', q: 'Metti in ordine i passaggi della carbonara', a: ['Prepara gli ingredienti', 'Taglia e cuoci il guanciale', 'Mescola uova e pecorino', 'Cuoci la pasta', 'Unisci tutto', 'Servi e mangia subito'] },
    { t: 'match', q: 'Di dove sono questi piatti?', pairs: [['risotto al nero di seppia', 'Venezia'], ['tagliatelle al ragù', 'Bologna'], ['cacio e pepe', 'Roma'], ['sfogliatella', 'Napoli']] },
    { t: 'choice', q: 'Il pasto più importante in Italia è…', o: ['il pranzo', 'la colazione', 'la cena'], a: 0 },
    { t: 'choice', q: 'Qual è tipico del Nord Italia?', o: ['riso e burro', 'olio d’oliva', 'pizza'], a: 0 },
    { t: 'choice', q: 'Il gelato si mangia…', o: ['tutto l’anno', 'solo in estate', 'solo a pranzo'], a: 0 }
  ],

  8: [
    { t: 'choice', q: 'La violoncellista dice: «Mi fa molto male…»', o: ['la testa', 'lo stomaco', 'la schiena'], a: 0 },
    { t: 'tf', ctx: 'Dalla dottoressa', s: 'La dottoressa proibisce i concerti per due mesi.', a: false, tip: 'Per almeno due settimane.' },
    { t: 'tf', ctx: 'Dalla dottoressa', s: 'La violoncellista deve dormire almeno otto ore.', a: true },
    { t: 'choice', q: 'Completa con dovere', s: 'Luca e Anna hanno mal di schiena. ___ muoversi un po’.', o: ['Devono', 'Deve', 'Dobbiamo'], a: 0 },
    { t: 'type', q: 'Completa con dovere', s: 'Noi siamo stanchi. ___ dormire di più.', a: ['dobbiamo'] },
    { t: 'choice', q: 'Devo bere alcol → forma negativa', o: ['Non devo bere alcol.', 'Devo non bevo alcol.', 'Non bevo devo alcol.'], a: 0 },
    { t: 'choice', q: 'Con il mal di denti bisogna…', o: ['andare dal dentista', 'fare sport intenso', 'aspettare'], a: 0 },
    { t: 'tf', ctx: 'Intervista a Fabio', s: 'Fabio gioca come attaccante.', a: false, tip: 'Fabio è portiere.' },
    { t: 'choice', q: 'Perché in italiano si dice «calcio»?', o: ['Viene dal verbo calciare', 'Viene dall’inglese', 'È il nome di una città'], a: 0 },
    { t: 'match', q: 'Abbina lo sport', pairs: [['calcio', 'piedi e una palla'], ['pallavolo', 'una rete e le mani'], ['pallacanestro', 'le mani e un canestro'], ['ciclismo', 'il Giro d’Italia']] },
    { t: 'choice', q: 'Stare + gerundio', s: 'I ragazzi stanno ___ a calcio.', o: ['giocando', 'giocare', 'giocato'], a: 0 },
    { t: 'type', q: 'Scrivi il gerundio', s: 'leggere → ___', a: ['leggendo'] },
    { t: 'choice', q: '«Sto per mangiare» significa…', o: ['Comincerò a mangiare tra pochissimo', 'Sto mangiando adesso'], a: 0 },
    { t: 'tf', ctx: 'Torino', s: 'Torino è la capitale della regione Piemonte.', a: true },
    { t: 'choice', q: 'Il bicerin è fatto con…', o: ['caffè, cioccolato e crema', 'latte e cacao', 'vino caldo e miele'], a: 0 },
    { t: 'choice', q: 'Dove si trova la Sindone?', o: ['Nella Cattedrale di San Giovanni Battista', 'Nel Museo Egizio', 'Nel Duomo di Milano'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Stiamo guardando la partita', extra: ['Stanno', 'guardare'] }
  ],

  9: [
    { t: 'type', q: 'Scrivi il congiuntivo di essere', s: 'Penso che Robert ___ confuso.', a: ['sia'] },
    { t: 'choice', q: 'Scegli il congiuntivo', s: 'Credo che lui ___ due persone.', o: ['ami', 'ama', 'amava'], a: 0 },
    { t: 'type', q: 'Scrivi il congiuntivo di dire', s: 'Irina vuole che Robert ___ la verità.', a: ['dica'] },
    { t: 'choice', q: 'Scegli il congiuntivo', s: 'È importante che lui ___ i suoi sentimenti.', o: ['capisca', 'capisce', 'capire'], a: 0 },
    { t: 'choice', q: 'Scegli il congiuntivo', s: 'Ho paura che Robert ___ tutto.', o: ['perda', 'perde', 'perdi'], a: 0 },
    { t: 'choice', q: 'Scegli il congiuntivo', s: 'È possibile che loro ___ ragione.', o: ['abbiano', 'hanno', 'avranno'], a: 0 },
    { t: 'choice', q: 'Quale frase è corretta?', o: ['Penso che lui ami sua moglie.', 'Penso che lui ama sua moglie.'], a: 0, tip: 'Dopo penso che si usa il congiuntivo.' },
    { t: 'match', q: 'Abbina l’infinito al congiuntivo', pairs: [['andare', 'vada'], ['fare', 'faccia'], ['stare', 'stia'], ['venire', 'venga'], ['sapere', 'sappia']] },
    { t: 'match', q: 'Colpi di fulmine: chi l’ha detto?', pairs: [['«Abbiamo costruito una macchina che sparava sorrisi.»', 'Franco'], ['«Sono vivo grazie a lei.»', 'Roberto'], ['«Sono comparsi dei mostri e io l’ho salvata.»', 'Marco']] },
    { t: 'type', q: 'Scrivi il passato prossimo di proibire', s: 'Il sindaco ___ di sorridere.', a: ['ha proibito'] },
    { t: 'choice', q: 'Scegli il passato prossimo', s: 'Sul treno ___ dei mostri.', o: ['sono apparsi', 'hanno apparso', 'è apparso'], a: 0 },
    { t: 'match', q: 'Abbina parola e definizione', pairs: [['colpo di fulmine', 'amore improvviso e travolgente'], ['resuscitare', 'riportare in vita qualcuno'], ['proibire', 'non permettere qualcosa'], ['salvare', 'togliere qualcuno da un pericolo']] },
    { t: 'tf', ctx: 'L’amore e il romanticismo italiano', s: 'Le lingue romanze derivano dal latino.', a: true },
    { t: 'tf', ctx: 'L’amore e il romanticismo italiano', s: 'La parola «romantico» esiste solo in italiano.', a: false, tip: 'romantique, romántico, romantic: stessa origine.' },
    { t: 'choice', q: 'La parola «romantico» viene da…', o: ['romanzo', 'Roma', 'rosa'], a: 0 },
    { t: 'tf', ctx: 'Ti amo in silenzio', s: 'La donna viene paragonata a un fiore d’estate.', a: false, tip: '«Un fiore d’inverno, un amore sincero.»' },
    { t: 'build', q: 'Riordina la frase', a: 'Spero che tu sia felice', extra: ['sei', 'è'] }
  ],

  10: [
    { t: 'type', q: 'Scrivi il futuro di visitare', s: 'Domani noi ___ la villa.', a: ['visiteremo'] },
    { t: 'type', q: 'Scrivi il futuro di preparare', s: 'Roberto ___ la cena.', a: ['preparerà'] },
    { t: 'choice', q: 'Scegli il futuro', s: 'Loro ___ alle otto.', o: ['arriveranno', 'arriverano', 'arrivaranno'], a: 0 },
    { t: 'choice', q: 'Scegli il futuro', s: 'Tu ___ il giardino.', o: ['vedrai', 'vederai', 'vedresti'], a: 0 },
    { t: 'type', q: 'Scrivi il futuro di avere', s: 'Noi ___ una festa.', a: ['avremo'] },
    { t: 'choice', q: 'Oggi fanno una festa → Domani…', o: ['faranno una festa', 'fanno una festa', 'farebbero una festa'], a: 0 },
    { t: 'choice', q: 'Futuro di cercare (io)', o: ['cercherò', 'cercerò', 'cercarò'], a: 0 },
    { t: 'match', q: 'Scrivi il nome della stanza', pairs: [['cucinare, preparare il caffè', 'la cucina'], ['fare la doccia, lavarsi i denti', 'il bagno'], ['dormire, riposare', 'la camera da letto'], ['studiare, lavorare al computer', 'lo studio'], ['parcheggiare la macchina', 'il garage']] },
    { t: 'tf', ctx: 'Ti invito nella mia nuova casa', s: 'Natalia vuole invitare anche il drago Zmaj.', a: false, tip: 'È Roberto a chiederlo. Natalia: «Solo umani.»' },
    { t: 'tf', ctx: 'Ti invito nella mia nuova casa', s: 'Alessio non ruba agli amici perché ha dei codici morali.', a: true },
    { t: 'choice', q: 'Piani per il futuro: Lorenzo proporrà matrimonio a…', o: ['Carlotta', 'Alice', 'Natalia'], a: 0 },
    { t: 'tf', ctx: 'Le carte del destino', s: 'Alice dice che stanno giocando a poker.', a: false, tip: 'Dice che stanno giocando a scopa.' },
    { t: 'choice', q: 'Quando si beve il cappuccino in Italia?', o: ['Al mattino, prima delle 11', 'Dopo cena', 'Solo in estate'], a: 0 },
    { t: 'choice', q: 'Quante carte ha il mazzo napoletano?', o: ['Quaranta', 'Cinquantadue', 'Trentadue'], a: 0 },
    { t: 'choice', q: 'Con cosa si prepara la polenta?', o: ['Farina di mais e acqua', 'Riso e brodo', 'Patate e latte'], a: 0 },
    { t: 'choice', q: 'Il nome «cappuccino» deriva da…', o: ['i frati cappuccini', 'il cappuccio di una giacca', 'una città del Nord'], a: 0 },
    { t: 'build', q: 'Riordina la frase', a: 'Domani ti amerò ancora di più', alt: ['Ti amerò ancora di più domani'], extra: ['amo', 'meno'] }
  ]
};

/* Esercizi in più per il test finale: mescolano gli argomenti di tutte le unità. */
CIAO.finalExtra = [
  { t: 'match', q: 'Abbina la frase al tempo verbale', pairs: [['Giocavo al parco', 'imperfetto'], ['Vorrei un caffè', 'condizionale'], ['Domani partirò', 'futuro'], ['Penso che sia vero', 'congiuntivo'], ['Chiudi la porta!', 'imperativo']] },
  { t: 'match', q: 'Abbina la città al suo simbolo', pairs: [['Venezia', 'le gondole'], ['Napoli', 'il Vesuvio'], ['Firenze', 'il Ponte Vecchio'], ['Torino', 'la Mole Antonelliana'], ['Milano', 'il Teatro alla Scala']] },
  { t: 'choice', q: 'Quale tempo si usa per un’abitudine nel passato?', o: ['L’imperfetto', 'Il futuro', 'Il congiuntivo', 'Il condizionale'], a: 0 },
  { t: 'choice', q: 'Quale frase è corretta?', o: ['Mi piacciono i musei.', 'Mi piace i musei.', 'Mi piaccio i musei.'], a: 0 },
  { t: 'build', q: 'Riordina la frase', a: 'Ieri ho mangiato benissimo ma mi mancavi tu', alt: ['Ieri ho mangiato benissimo ma tu mi mancavi'], extra: ['mangiavo', 'mancato'] }
];
