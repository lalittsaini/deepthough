const leftboard = document.querySelector('.leftboard');
const arrowbutton = document.querySelector('.arrow');
const stepsdiv = document.querySelector('.step');
const contentdiv = document.querySelector('.content')
const appendcontent =document.querySelector('.appendcontent');
let isMoved = false;
let isRotated = false;
let isText = false;
arrowbutton.addEventListener('click', () => {
    
    
    if (isRotated,isText,isMoved) {
        arrowbutton.style.transform = 'rotate(0deg)';
        stepsdiv.textContent = '1';
        leftboard.style.position = '';
        leftboard.style.width = '';
        stepsdiv.style.border = '';
        appendcontent.innerHTML = '';

    } else {
        arrowbutton.style.transform = 'rotate(180deg)';
        stepsdiv.textContent = '';
        leftboard.style.position = 'absolute';
        leftboard.style.width = '30%';
        stepsdiv.style.border = 'none';
        appendcontent.innerHTML += '<ul><li><h3>Explore the world of management</h3></li><li><p>Technical Project Management</p></li><li><p>Threadbuild</p></li><li><p>Structure you pointers</p></li><li><p></p>4SA Method</li></ul>';
    }
    isRotated = !isRotated;
    isText = !isText;
    isMoved = !isMoved;

    

});



const url = './file.json';

async function fetchAndCreateCards() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const tasks = data.tasks; 
        const cardGrid = document.querySelector('.cardgrid');
        const exploresection = document.querySelector('.exploresection');

        
        tasks.forEach(task => {
        const tasktitle = document.createElement('h3');
        const taskdes = document.createElement('p');
        tasktitle.innerText =`${task.task_title}`;
        taskdes.innerText = `${task.task_description}`;
        exploresection.appendChild(tasktitle);
        exploresection.appendChild(taskdes);
        });

        



    
        if (!cardGrid) {
            throw new Error('Card grid container not found');
        }

        tasks.forEach(task => {
            task.assets.forEach(asset => {
                const card = document.createElement('div');
                card.className = 'card';
                if (asset.asset_type === 'input_asset' && asset.asset_content_type === 'threadbuilder') {
                    card.innerHTML = `
                        <div class="cardheading">
                            <h4>${asset.asset_title}</h4>
                        </div>
                        <div class="carddescription">
                            <p>Description: ${asset.asset_description}</p>
                        </div>
                        <div class="cardmainsection">
                        
                            <div class="threadbuild">
                            <div>
                        <label>Thread A</label>
                        <input type="text" placeholder="Sub Thread 1">
                        <input type="text" placeholder="Sub     Interpretation 1">
                    </div>
                    <div class="actions">
                        <i class="fas fa-bold"></i>
                        <i class="fas fa-italic"></i>
                        <i class="fas fa-underline"></i>
                        <i class="fas fa-list"></i>
                <select>
                            <option>Select Categ</option>
                        </select>
                        <select>
                    <option>Select Proces</option>
                </select>
            </div>
            <button class="add-thread">+ Sub Thread</button>
            <textarea placeholder="Summary for Thread A"></textarea>
        </div>
                        </div>
                    `;
                } else if (asset.asset_type === 'input_asset' && asset.asset_content_type === 'article') {
                    card.innerHTML = `<div class="cardheading">
                            <h4>${asset.asset_title}</h4>
                        </div>
                        <div class="carddescription">
                            <p>Description: ${asset.asset_description}</p>
                        </div>
                        <div class="cardmainsection">
                            <div class="structure">
                            <input placeholder="Title" type="text"/>
                            <textarea placeholder="Content"></textarea>
                             
                            </div>
                        </div>`
                }
                else {
                    card.innerHTML = `
                        <div class="cardheading">
                            <h4>${asset.asset_title}</h4>
                        </div>
                        <div class="carddescription">
                            <p>Description: ${asset.asset_description}</p>
                        </div>
                        <div class="cardmainsection">
                            <iframe width="560" height="315" src="${asset.asset_content}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    `;
                }
                cardGrid.appendChild(card);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchAndCreateCards();


