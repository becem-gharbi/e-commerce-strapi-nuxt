<template>
  <div
    class="modal modal-blur fade"
    :id="modalId"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div v-if="product.id" class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ product.name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row g-4">
            <div class="col-md-5 text-center">
              <img
                :src="product.image"
                alt=""
                height="250px"
                style="object-fit: contain"
                
              />
            </div>
            <div class="col-md-7">
              <div class="d-flex flex-column justify-content-between h-100">
                <div class="mb-3">
                  <label class="form-label">Description</label>
                  <div class="text-muted">
                    {{ product.description }}
                  </div>
                </div>
                <ProductUser></ProductUser>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["product"]),
  },
};
</script>
