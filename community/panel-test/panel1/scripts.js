const members = [
    {
        photo: 'images/axieology.jpg',
        name: 'Identity unknown',
        alias: 'Axieology.ron',
        role: 'Darkside Commander',
        skills: 'Leadership, Darkside suite mastery',
        background: "Background information: Axieology, the Darkside Commander, is a legendary leader of the Grimbone clan. Renowned for his unparalleled mastery over Darkside suits, he possesses a total of 26, including 4 of the rare Grandmaster tier, out of his 57 suits. This extraordinary collection has attracted 17 Darkside Spirit Guardians to his aid. His half-Kailantian and half-Trakarian heritage grants him a unique blend of mystical and technological prowess, making him an unstoppable force on the battlefield. Axieology's strategic brilliance and combat prowess have solidified his reputation as a beacon of hope for the Grimbone clan and a symbol of the indomitable will to survive in the harsh world of Kaidro.",
        video1: 'https://kaidro-prod-nft-metadata.s3.us-east-2.amazonaws.com/nft/mech/90264d503887bc098259668ca234f5b7394ea0d01bb647dc88c8156014088e5f.mp4',
        video2: 'images/sgaxie.mp4',
        website: ''
    },
    {
        photo: 'images/palmer.jpg',
        name: 'identity unknown',
        alias: 'Palmer.ron',
        role: 'Egg/crate Lord',
        skills: 'luck and perseverance',
        background: "Background information: Palmer, known as the Egg/Crate Lord, is a beloved member of the Grimbone clan. Famed for his remarkable luck and unwavering perseverance, Palmer has a penchant for gambling on clan crates, much to the delight of his Grimbone comrades. His spirited nature and love for entertainment bring joy and happiness to the community, making him a cherished figure within the clan. Palmer's unique blend of humor and risk-taking keeps the Grimbone spirit alive, fostering camaraderie and uplifting those around him, even those from other clans. Palmer's dedication to his clan is reflected in his impressive collection of 56 sparksuits, six of which are grandmaster tier.",
        video1: 'https://kaidro-prod-nft-metadata.s3.us-east-2.amazonaws.com/nft/mech/516544bdf7da34158fdc3860f3fb72095d91e8be3f09c241b8a12b955add67d3.mp4',
        video2: 'https://kaidro-prod-nft-metadata.s3.us-east-2.amazonaws.com/nft/mech/75f01391ed830a2795c69516733f816fd1613234cd48725d4f11cfbcc23ed1b5.mp4',
        website: ''
    },
    {
        photo: 'images/nathan.jpg',
        name: 'Nathan',
        alias: 'Nathan',
        role: 'Source Journal Holder',
        skills: 'Networking, community building',
        background: "Background information: Nathan holds the unique honor of being the sole bearer of the Source Journal, the rarest and most coveted journal in all of the astral realm and Táljor. This esteemed artifact not only underscores his position within the clan but also enhances his role as a key source of invaluable knowledge and guidance. His possession of the Source Journal adds an unparalleled depth to his contributions, making him an irreplaceable asset to the Emerald Hand and a vital link to the clan's continued success and enlightenment. In addition to his networking prowess, Nathan is a valued dealer of information. He plays a crucial role in keeping citizens informed about the latest developments and affairs from beyond their immediate surroundings.",
        video1: 'https://kaidro.com/nft/journal/journal_source.mp4',
        video2:'',
        website:'',
        },
    // Add more member objects as needed
];
function createMemberCard(member) {
    const template = document.getElementById('file-template');
    const memberCard = template.cloneNode(true);
    memberCard.removeAttribute('id');
    memberCard.style.display = 'block';  // Make the cloned card visible
    memberCard.querySelector('.member-photo').src = member.photo;
    memberCard.querySelector('h2').textContent = member.name;
    memberCard.querySelector('.alias').textContent = 'Alias: ' + member.alias;
    memberCard.querySelector('.role').textContent = 'Role: ' + member.role;
    memberCard.querySelector('.skills').textContent = 'Special Skills: ' + member.skills;
    memberCard.querySelector('.background').innerHTML = member.background; // Allow HTML in background text

    const video1 = memberCard.querySelector('.video1');
    const video2 = memberCard.querySelector('.video2');
    const button = memberCard.querySelector('.visit-site-button');

    // Set the source for the first video
    video1.src = member.video1;

    // Handle the second video
    if (member.video2) {
        video2.src = member.video2;
        video2.style.display = 'block';  // Ensure video2 is visible if it exists
    } else {
        video2.style.display = 'none';  // Hide video2 if it does not exist
    }

    // Handle the website button
    if (member.website) {
        button.style.display = 'block';  // Show the button if website exists
        button.onclick = () => window.location.href = member.website;
    } else {
        button.style.display = 'none';  // Hide the button if no website
    }

    return memberCard;
}

function displayMembers() {
    const container = document.querySelector('.grid-container');
    members.forEach(member => {
        const memberCard = createMemberCard(member);
        container.appendChild(memberCard);
    });
    document.getElementById('file-template').remove();  // Remove the template from the DOM
}

// Initial display
document.addEventListener('DOMContentLoaded', displayMembers);
