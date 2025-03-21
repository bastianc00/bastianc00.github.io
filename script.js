document.addEventListener('DOMContentLoaded', function() {
   
    document.getElementById('button').addEventListener('click', function() {
        document.getElementById('display-text').textContent = document.getElementById('text-input').value;
    });

    
    const fetchNewsButton = document.getElementById('fetch-news');
    const categorySelect = document.getElementById('news-category');
    const newsContainer = document.getElementById('news-container');
    
    fetchNewsButton.addEventListener('click', fetchNews);
    
    function fetchNews() {
        const category = categorySelect.value;
        
        const apiKey = '18311558b4ca4cb4b6a36c25ac3fd98f';
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
        
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                displayNews(data.articles.slice(0, 10));
            })
    }
    
    function displayNews(articles) {
        
        newsContainer.innerHTML = '';
        
        articles.forEach(article => {
            const articleCard = document.createElement('div');
            articleCard.className = 'col-md-6 mb-4';
            
            articleCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${article.title || 'No title'}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${article.source.name || 'Unknown source'}</h6>
                        <p class="card-text">${article.description || 'No description available'}</p>
                    </div>
                    <div class="card-footer">
                        <a href="${article.url}" class="btn btn-sm btn-primary" target="_blank">Read More</a>
                        <small class="text-muted float-end">${new Date(article.publishedAt).toLocaleDateString()}</small>
                    </div>
                </div>
            `;
            
            newsContainer.appendChild(articleCard);
        });
    }
});