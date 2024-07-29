const lordsMembers = [
    { name: "Freak<br>Emerald hand clan", imageUrl: "https://cors-anywhere.herokuapp.com/https://x.com/JoeeMars1990/photo" },
    { name: "Trung<br>Grimbone clan", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "CocoBear<br>Bubblegum violence clan", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
];

const clan1Members = [
    { name: "FFPlz.ron", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Axieology.ron", imageUrl: "https://cors-anywhere.herokuapp.com/https://x.com/JoeeMars1990/photo" },
    { name: "Kai shoto", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },

];

const clan2Members = [
    { name: "Palmer.ron", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Drewmeister", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Jihoz.ron", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Gabby Dizon", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const clan3Members = [
    { name: "Fourx", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Wyrath", imageUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
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
