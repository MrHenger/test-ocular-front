<template>
  <div class="d-flex align-center grey lighten-4" style="height: 100%">
    <v-container>
      <v-row class="d-flex justify-center">
        <v-col cols="9" sm="7" lg="5">
          <v-card>
            <div class="d-flex justify-center pt-6 pb-4">
              <v-card-title
                ><span class="text-subtitle-1 text-sm-h6 text-md-h5 font-weight-bold"
                  >Entra con tus credenciales</span
                ></v-card-title
              >
            </div>
            <ValidationObserver v-slot="{ invalid }">
              <v-form>
                <v-row class="justify-center">
                  <v-col cols="10">
                    <ValidationProvider name="Correo" rules="required|email" v-slot="{ errors }">
                      <v-text-field
                        outlined
                        dense
                        v-model="data.email"
                        label="Correo"
                        type="email"
                        required
                        :error-messages="errors[0]"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="10">
                    <ValidationProvider name="Contraseña" rules="required" v-slot="{ errors }">
                      <v-text-field
                        outlined
                        dense
                        v-model="data.password"
                        label="Contraseña"
                        required
                        type="password"
                        :error-messages="errors[0]"
                        @keyup.enter.native="submit()"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>

                  <v-col cols="10" class="d-flex justify-center pb-10">
                    <v-btn
                      :loading="loadingButton"
                      :disabled="invalid"
                      block
                      class="py-6"
                      color="blue darken-4"
                      @click.prevent="submit()"
                    >
                      <span class="white--text">Iniciar sesión</span>
                    </v-btn>
                  </v-col>
                  <!-- <v-col cols="10" class="d-flex justify-end mb-8">
                    <v-btn plain color="#00489A" class="px-0 text-caption" @click.prevent="reset()"
                      >¿Olvidastes tu contraseña?</v-btn
                    >
                  </v-col> -->
                </v-row>
              </v-form>
            </ValidationObserver>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      data: {
        password: '',
        email: '',
      },
      loadingButton: false,
    };
  },
  methods: {
    submit() {
      this.loadingButton = true;
      this.$axios
        .post('http://127.0.0.1:8000/api/login', this.data)
        .then((res) => {
          localStorage.setItem('token', res.data.token);
          const token = localStorage.getItem('token');
          this.$axios.defaults.headers.Authorization = `Bearer ${token}`;
          this.$router.push({ name: 'adminPost' });
        })
        .catch((error) => {
          let message;
          if (error.response.status === 422) {
            message = error.response.data.message;
          } else {
            message = 'Ha ocurrido un error inesperado';
          }
          Swal.fire({
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 5000,
            position: 'bottom-end',
            timerProgressBar: true,
            toast: true,
            showCloseButton: true,
          });
        })
        .finally(() => {
          this.loadingButton = false;
        });
    },
  },
};
</script>
