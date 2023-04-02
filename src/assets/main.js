const API = 'https://collectionapi.metmuseum.org/public/collection/v1'
const content = null || document.getElementById('content')

async function fetchData(urlApi){
    const response = await fetch(urlApi)
    const objects = await response.json()
    return objects
}


(async ()=> {

    try {
        let hasNotTenPicture = true
        let pictures = []
        let id = 436524

        while(hasNotTenPicture){
            try{
                const picture = await fetchData(`${API}/objects/${id}`)
    
                pictures = (picture.primaryImage) 
                    ? [...pictures, picture]
                    : [...pictures]
    
                hasNotTenPicture = pictures.length < 8
                id ++
            }catch(err){
                console.error(err);
            }
            
        }

        console.log(hasNotTenPicture)
        console.log(pictures)

        let view = `
        ${pictures.map( picture => `
        <div class="group relative">
        <div
          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
          <img src="${picture.primaryImage}" alt="${picture.title}" class="max-w-sm h-auto">
        </div>
        <div class="mt-4 flex justify-between">
          <h3 class="text-sm text-gray-700">
            <span aria-hidden="true" class="absolute inset-0"></span>
            ${picture.title}
          </h3>
        </div>
      </div>
        `).join('')}
       
        `

        content.innerHTML = view
        
    } catch(err) {
        console.error(err)
    }
  
})()