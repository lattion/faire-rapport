// Base de données des cours et des TPs avec ta vraie structure de dossiers
const data = {
    annee1: {
        "AlgebreLineaire": ["TP 1", "TP 2", "TP 3"],
        "Algo": ["TP 1", "TP 2", "TP 3"],
        "Allemand": ["TP 1", "TP 2", "TP 3"],
        "Analyse": ["TP 1", "TP 2", "TP 3"],
        "Anglais": ["TP 1", "TP 2", "TP 3"],
        "Comm": ["TP 1", "TP 2", "TP 3"],
        "Eco": ["TP 1", "TP 2", "TP 3"],
        "IHM": ["TP 1", "TP 2", "TP 3"],
        "MethIT": ["TP 1", "TP 2", "TP 3"],
        "Prog": ["TP 1", "TP 2", "TP 3"],
        "Technum": ["TP 1", "TP 2", "TP 3"]
    },
    annee2: {
        "ADO": ["TP 1", "TP 2", "TP 3"],
        "Concurp": ["TP 1", "TP 2", "TP 3"],
        "GestionProjet": ["TP 1", "TP 2", "TP 3"],
        "MathsSpe": ["TP 1", "TP 2", "TP 3"],
        "Physique": ["TP 1", "TP 2", "TP 3"],
        "ReseauxIP": ["TP 1", "TP 2", "TP 3"],
        "Signaux": ["TP 1", "TP 2", "TP 3"],
        "Stats": ["TP 1", "TP 2", "TP 3"],
        "SysNum": ["TP 1", "TP 2", "TP 3"]
    },
    annee3: {
        "agentic": ["TP 1", "TP 2", "TP 3"],
        "anar": ["TP 1", "TP 2", "TP 3"],
        "archireseau": ["TP 1", "TP 2", "TP 3"],
        "conception": ["TP 1", "TP 2", "TP 3"],
        "ecoIT": ["TP 1", "TP 2", "TP 3"],
        "Ethique": ["TP 1", "TP 2", "TP 3"],
        "infravir": ["TP 1", "TP 2", "TP 3"],
        "secapp": ["TP 1", "TP 2", "TP 3"],
        "secuIT": ["TP 1", "TP 2", "TP 3"],
        "serviceapp": ["TP 1", "TP 2", "TP 3"],
        "syscomm": ["TP 1", "TP 2", "TP 3"],
        "sysembarque": ["TP 1", "TP 2", "TP 3"],
        "sysinfo": ["TP 1", "TP 2", "TP 3"],
        "Teleinf": ["TP 1", "TP 2", "TP 3"]
    }
};

// Récupération des éléments HTML
const selectYear = document.getElementById('select-year');
const selectCourse = document.getElementById('select-course');
const selectTp = document.getElementById('select-tp');
const btnDownload = document.getElementById('btn-download');
const btnAi = document.getElementById('btn-ai');
const notification = document.getElementById('notification');

// 1. Quand on change d'année
selectYear.addEventListener('change', () => {
    const yearSelected = selectYear.value;
    
    // Réinitialisation complète des menus dépendants
    selectCourse.innerHTML = '<option value="">-- Sélectionner un cours --</option>';
    selectTp.innerHTML = '<option value="">-- Choisis d\'abord le cours --</option>';
    selectCourse.disabled = true;
    selectTp.disabled = true;
    btnDownload.disabled = true;
    btnAi.disabled = true;

    if (yearSelected && data[yearSelected]) {
        // Remplir le sélecteur de cours
        Object.keys(data[yearSelected]).forEach(course => {
            const option = document.createElement('option');
            option.value = course;
            option.textContent = course;
            selectCourse.appendChild(option);
        });
        selectCourse.disabled = false;
    }
});

// 2. Quand on change de cours
selectCourse.addEventListener('change', () => {
    const yearSelected = selectYear.value;
    const courseSelected = selectCourse.value;

    selectTp.innerHTML = '<option value="">-- Sélectionner un TP --</option>';
    selectTp.disabled = true;
    btnDownload.disabled = true;
    btnAi.disabled = true;

    if (courseSelected) {
        const tps = data[yearSelected][courseSelected];
        tps.forEach((tp, index) => {
            const option = document.createElement('option');
            option.value = `tp${index + 1}`; // Renverra tp1, tp2, etc.
            option.textContent = tp;
            selectTp.appendChild(option);
        });
        selectTp.disabled = false;
    }
});

// 3. Quand on sélectionne un TP
selectTp.addEventListener('change', () => {
    const tpSelected = selectTp.value;
    if (tpSelected) {
        btnDownload.disabled = false;
        btnAi.disabled = false;
    } else {
        btnDownload.disabled = true;
        btnAi.disabled = true;
    }
});

// 4. Action de téléchargement du PDF
btnDownload.addEventListener('click', () => {
    const year = selectYear.value;
    const course = selectCourse.value; 
    const tp = selectTp.value; 

    // Construit le chemin absolu du fichier : cours/annee1/AlgebreLineaire/tp1.pdf
    const fileUrl = `cours/${year}/${course}/${tp}.pdf`;

    // Déclencheur du téléchargement natif du navigateur
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${course}_${tp.toUpperCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// 5. Action Prompt Assistant IA
btnAi.addEventListener('click', () => {
    const courseName = selectCourse.value;
    const tpName = selectTp.options[selectTp.selectedIndex].textContent;

    const promptText = `Agis en tant que tuteur universitaire expert en ${courseName}. 
Je m'apprête à rédiger mon rapport pour le "${tpName}". 

Aide-moi à réviser et à structurer mon travail en effectuant les tâches suivantes :
1. Rappelle-moi brièvement les théories et formules fondamentales indispensables pour ce sujet.
2. Explique-moi les pièges classiques ou erreurs de manipulation courantes à éviter lors de l'analyse des données de ce TP.
3. Propose-moi un plan de rédaction optimisé pour ce rapport (But, Méthode, Analyse, Discussion des incertitudes).

Ne me donne pas de réponses pré-mâchées, pose-moi plutôt des questions guidées pour me forcer à réfléchir et construire mon raisonnement scientifique.`;

    // Copie automatique dans le presse-papier
    navigator.clipboard.writeText(promptText).then(() => {
        notification.classList.remove('hidden');
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 4000);
    }).catch(err => {
        alert("Impossible de copier le prompt automatiquement.");
    });
});