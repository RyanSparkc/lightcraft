<template>
  <div class="position-relative">
    <div class="position-absolute" style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
      background-position: center center; opacity: 0.1;"></div>
    <div class="container d-flex flex-column" style="min-height: 100vh;">
      <nav class="navbar navbar-expand-lg navbar-light">
        <a class="navbar-brand" href="./index.html">Navbar</a>
        <button class="navbar-toggler" type="button"
         data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link me-4 active"
             href="./index.html">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link me-4" href="./product.html">Product</a>
            <a class="nav-item nav-link me-4" href="./detail.html">Detail</a>
            <a class="nav-item nav-link" href="./cart.html"><i class="fas fa-shopping-cart"></i></a>
          </div>
        </div>
      </nav>
      <div class="row justify-content-center my-auto">
        <div class="col-md-4 text-center">
          <h2>Lorem ipsum.</h2>
          <p class="text-muted mb-0">Lorem ipsum dolor
             sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.
          </p>
          <button class="btn btn-dark rounded-0 mt-6">Lorem ipsum.</button>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
            class="card-img-top rounded-0" alt="..." />
          <div class="card-body text-center">
            <h4>Lorem ipsum</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
            class="card-img-top rounded-0" alt="..." />
          <div class="card-body text-center">
            <h4>Lorem ipsum</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 mt-md-4">
        <div class="card border-0 mb-4">
          <img
            src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
            class="card-img-top rounded-0" alt="..." />
          <div class="card-body text-center">
            <h4>Lorem ipsum</h4>
            <div class="d-flex justify-content-between">
              <p class="card-text text-muted mb-0">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-light mt-7">
    <div class="container">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <h3>Lorem ipsum.</h3>
                <p class="my-5">“Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat.”</p>
                <p><small>—Lorem ipsum dolor sit amet.—</small></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <h3>Lorem ipsum.</h3>
                <p class="my-5">“Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat.”</p>
                <p><small>—Lorem ipsum dolor sit amet.—</small></p>
              </div>
            </div>
          </div>
          <div class="carousel-item">
            <div class="row justify-content-center py-7">
              <div class="col-md-6 text-center">
                <h3>Lorem ipsum.</h3>
                <p class="my-5">“Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr, sed diam nonumy eirmod tempor
                  invidunt ut labore et dolore magna aliquyam erat.”</p>
                <p><small>—Lorem ipsum dolor sit amet.—</small></p>
              </div>
            </div>
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls"
         role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls"
         role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  },
};
</script>

<style scoped>
</style>
