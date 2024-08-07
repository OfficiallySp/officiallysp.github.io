document.addEventListener('DOMContentLoaded', function() {
    const footer = `
        <footer class="py-4 bg-gradient-dark nightowl-daylight">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-3 text-start my-auto">
                        <p class="text-white">Copyright © 2022-2024 Shane Pepperell</p>
                    </div>
                </div>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footer);
});
