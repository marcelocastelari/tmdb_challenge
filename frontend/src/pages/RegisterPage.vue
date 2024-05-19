<template>
    <div class="h-screen md:bg-neutral-800 ">
        <div class="flex justify-center">
            <div class=" bg-slate-50 lg:mt-28 md:mt-20 mt-32 md:flex md:rounded-xl md:shadow-xl md:pt-4 md:pr-4 lg:pr-0">
                <div class=" lg:pl-20 lg:mr-10 md:p-12 md:pb-16">
                    <p class="">Crie uma conta</p>
                    <form @submit.prevent="register" action="" class="mt-8 w-full">
                        <input v-model="email" type="email" placeholder="Email" class="input h-11 rounded pl-2 w-full lg:w-96"> <br>
                        <input v-model="password" type="password" placeholder="Senha" class="input h-11 mt-7 mb-6 rounded pl-2 w-full lg:w-96">
                        <br>
                        <button
                            class="inline-flex items-center justify-center focus:outline-none transition ease-in-out duration-1000 hover:duration-300 font-semibold rounded-lg text-neutral-800 bg-yellow-400 hover:bg-yellow-500 hover:shadow-lg hover:shadow-yellow-500/50 md:text-lg md:h-16 h-12 w-full lg:w-96">
                            Criar conta
                        </button>
                        <div class="flex justify-center mt-10">
                            <span>Já tem uma conta?</span>
                        </div>
                        <button
                            class="button-g md:h-16 mt-10 h-12 rounded bg-neutral-800 text-white md:text-lg w-full lg:w-96"
                            @click="this.$router.push('/login')"
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
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

let email = ref('');
let password = ref('');
const router = useRouter();

const redirect = (endpoint) => {
    setTimeout(() => {
        router.push(endpoint).then(() => {
            window.location.reload()
        });
    }, 2500)
}

const notifySuccess = () => {
    toast.info('Cadastro realizado! Redirecinando para login', { autoClose: 2000 });
};

const notifyError = (message) => {
    toast.error(message, { autoClose: 2000 });
};

const register = async() => {
    try {
        console.log(email.value);
        console.log(password.value);
        const response = await fetch('http://localhost:8000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        if(!response.ok) {
            throw new Error('Error')
        }

        email.value = '';
        password.value = '';
        notifySuccess();
        redirect('/')

    } catch (error) {
        email.value = '';
        password.value = '';
        notifyError('Erro ao cadastrar usuário');
    }
}

</script>

<style scoped>
.input {
    border: 1px solid #696969;
}

</style>