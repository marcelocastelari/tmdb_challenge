<template>
    <div class="h-screen md:bg-neutral-800">
      <div class="flex justify-center">
        <div class="bg-slate-50 lg:mt-28 md:mt-20 mt-32 md:flex md:rounded-xl md:shadow-xl md:pt-4 md:pr-4 lg:pr-0">
          <div class="lg:pl-20 lg:mr-10 md:p-12 md:pb-16">
            <p class="">Crie uma conta</p>
            <form @submit.prevent="register" action="" class="mt-8 w-full">
              <div>
                <input v-model="email" type="email" placeholder="Email" class="input h-11 rounded pl-2 w-full lg:w-96">
                <br>
                <span v-if="!validateEmail(email)" class="text-gray-500 text-sm">Insira um email válido.</span>
              </div>
              <div>
                <input v-model="password" type="password" placeholder="Senha" class="input h-11 mt-3  rounded pl-2 w-full lg:w-96">
                <br>
                <span v-if="password.length < 6" class="text-gray-500 text-sm">A senha deve ter pelo menos 6 caracteres.</span>
              </div>
              <button
                :disabled="!validateForm"
                id="register"
                class="inline-flex items-center justify-center mt-10 focus:outline-none transition ease-in-out duration-1000 hover:duration-300 font-semibold rounded-lg text-neutral-800 bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 md:text-lg md:h-16 h-12 w-full lg:w-96"
              >
                Criar conta
              </button>
              <div class="flex justify-center mt-10">
                <span>Já tem uma conta?</span>
              </div>
              <button
                class="button-g md:h-16 mt-10 h-12 rounded bg-neutral-800 text-white md:text-lg w-full lg:w-96"
                @click="redirectToLogin"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { toast } from 'vue3-toastify';
  import { useStore } from 'vuex';
  
  let email = ref('');
  let password = ref('');
  const router = useRouter();
  const store = useStore();
  
  const redirect = (endpoint) => {
      setTimeout(() => {
          router.push(endpoint).then(() => {
              window.location.reload()
          });
      }, 2500)
  }
  
  const notifySuccess = (message) => {
      toast.info(message);
  };
  
  const notifyError = (message) => {
      toast.error(message, { autoClose: 2000 });
  };
  
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  
  const validateForm = () => {
    return validateEmail(email.value) && validatePassword(password.value);
  };
  
  const register = async() => {
      try {
          if(validateForm(email.value, password.value)) {
              const success = await store.dispatch('user/register', { email: email.value, password: password.value });
              if (success) {
                  email.value = '';
                  password.value = '';
                  notifySuccess('Cadastro realizado! Redirecionando para o login');
                  redirect('/');
              } else {
                  notifyError('Dados inválidos!')
              }
          }
      } catch (error) {
          notifyError(error.message);
      }
  }

const redirectToLogin = () => {
  router.push('/');
};
  </script>
  
  <style scoped>
  .input {
      border: 1px solid #696969;
  }
  </style>
  