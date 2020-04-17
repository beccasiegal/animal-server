<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Encyclopedia Search</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="index.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"integrity="sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="container">
        <h1>Animal Naming</h1>
        <p>Pick an image and give it a name</p>

     <div class form> <form id="js-form">
            <label for="search-term">What Animal would you like?</label>
            <input type="text" name="search-term" id="js-search-term" required>

            <input type="submit" value="Search">
        </form>
</div>
        <p id="js-error-message" class="error-message"></p>
        <section id="results" class="hidden">
          <h2>Search results</h2>
          <div id="results-list" aria-live="polite">
          </div>
          <h2>More Photos</h2>
          <div id="photo-results" aria-live="polite"> 

          </div>
        </section>
    </div>
    <script src="script.js"></script>
</body>
</html>