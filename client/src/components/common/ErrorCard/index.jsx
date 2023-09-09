const ErrorCard = (props) => (
  <div class="row">
    <div class="col-sm-6">
      <div class="text-white bg-secondary">
        <div class="card-body">
          <h5 class="card-title">{props?.msg}</h5>
          <p class="card-text">
            We are very sorry for the inconvinience caused.
            <br />
            For any information, please contact +91-8951231231.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorCard;
