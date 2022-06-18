export default function ({ $axios, redirect, $swal }) {
    $axios.onError(error => {
        $swal.fire({
            padding: '0.2rem',
            title: "<p class='h3'>" + error.response.data.error.message + "</p>",
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            icon: "error",
            width: '20rem',
        });
    });
}
