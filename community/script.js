const lordsMembers = [
    { name: "Trung<br>Grimbone clan", imageUrl: "images/trung.jpg" },
    { name: "CocoBear<br>Bubblegum violence clan", imageUrl: "images/cocobear.jpg"},
    { name: "Freak<br>Emerald hand clan", imageUrl: "images/freak.jpg" },
];

const clan1Members = [
    { name: "Robert Simons", imageUrl: "images/robert.jpg" },
    { name: "FFPlz.ron", imageUrl: "images/ffplz.jpg" },
    { name: "Axieology.ron", imageUrl: "images/axieology.jpg" },
    { name: "Kezia.ron", imageUrl: "images/kez.jpg" },
    { name: "Ghost.ron", imageUrl: "images/ghost.jpg" },
    { name: "SHADR.ron", imageUrl: "images/shadr.jpg" },
    { name: "roninstudios.ron", imageUrl: "images/ronin.png" },
    { name: "Kai Shoto", imageUrl: "images/kai.png" },
    { name: "Drewmeister", imageUrl: "images/drew.png" },
    { name: "Envy", imageUrl: "images/envy.png" },
    { name: "spriteterror", imageUrl: "images/sprite.png" },
    { name: "ruevencil.ron", imageUrl: "images/ruven.png" },
    { name: "Gila.ron", imageUrl: "images/gila.jpg" },
    { name: "1437", imageUrl: "images/1437.jpg" },

];

const clan2Members = [
    { name: "Palmer.ron", imageUrl: "images/palmer.jpg" },
    { name: "GhostWolf", imageUrl: "images/ghostwolf.png" },
    { name: "droidmentality.ron", imageUrl: "images/droid.png" },
    { name: "orcaetal.ron", imageUrl: "images/orcaetal.png" },
    { name: "Nathan", imageUrl: "images/nathan.jpg" },
    { name: "Jihoz.ron", imageUrl: "images/jihoz.jpg" },
    { name: "Gabby Dizon", imageUrl: "images/gab.jpg" },
];

const clan3Members = [
    { name: "Peggy Chung", imageUrl: "images/peggy.jpg" },
    { name: "Fourx", imageUrl: "images/fourx.jpg" },
    { name: "Wyrath", imageUrl: "images/wyrath.png" },
    { name: "Biku.ron", imageUrl: "images/biku.jpg" },
    { name: "Caine", imageUrl: "images/caine.png" },
    { name: "Laird", imageUrl: "images/laird.png" },

];

// Function to render members
function renderMembers(clanId, members) {
    const clanElement = document.getElementById(clanId);
    const membersGrid = clanElement.querySelector('.members-grid');
    
    members.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('member');
        
        const img = document.createElement('img');
        img.src = member.imageUrl;
        img.alt = member.name;

        const name = document.createElement('div');
        name.classList.add('member-name');
        name.innerHTML = `<strong>${member.name}</strong>`; // Make name bold using <strong> tag
        
        memberDiv.appendChild(img);
        memberDiv.appendChild(name);
        membersGrid.appendChild(memberDiv);
    });
}

// Render members for each clan
renderMembers('lords', lordsMembers);
renderMembers('clan1', clan1Members);
renderMembers('clan2', clan2Members);
renderMembers('clan3', clan3Members);
