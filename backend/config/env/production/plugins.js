module.exports = ({ env }) => ({
    upload: {
        config: {
            provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
            providerOptions: {
                bucketName: env('BUCKET_NAME'),
                publicFiles: true,
                uniform: false,
                baseUrl: `https://storage.googleapis.com/${env('BUCKET_NAME')}`,
            },
        },
    },
    email: {
        config: {
            provider: 'sendgrid',
            providerOptions: {
                apiKey: env('SENDGRID_API_KEY'),
            },
            settings: {
                defaultFrom: env('SENDGRID_SENDER_EMAIL'),
                defaultReplyTo: env('SENDGRID_SENDER_EMAIL'),
            },
        },
    },
});