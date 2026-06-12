import http from 'k6/http';
import { group, check, sleep } from 'k6';

const BASE_URL = 'https://carter-singh-bakehouse.cta-training.academy/';

export const options = {
    scenarios: {
        bounce: {
            exec: 'homeJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 10 },
                { duration: '30s', target: 10 },
            ],
            gracefulRampDown: '5s',
        },
        products: {
            exec: 'productsJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 6 },
                { duration: '30s', target: 6 },
            ],
            gracefulRampDown: '5s',
        },
        customers: {
            exec: 'customerJourney',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 8 },
                { duration: '30s', target: 8 },
            ],
            gracefulRampDown: '5s',
        },
        child: {
            exec: 'makeChild',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 8 },
                { duration: '30s', target: 8 },
            ],
            gracefulRampDown: '5s',
        },
        order: {
            exec: 'makeOrder',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 8 },
                { duration: '30s', target: 8 },
            ],
            gracefulRampDown: '5s',
        },
        cprod: {
            exec: 'createProduct',
            executor: 'ramping-vus',
            startVUs: 0,
            stages: [
                { duration: '30s', target: 8 },
                { duration: '30s', target: 8 },
            ],
            gracefulRampDown: '5s',
        },
    },

    thresholds: {
        http_req_duration: ['p(95)<250', 'max<2000'],
        http_req_failed: ['rate<0.1'],
    },
};

export function homeJourney() {
    group('home journey', () => {
        simpleGetRequest(BASE_URL, '<div id="root"></div>');
        sleep(5);
    });
}

export function productsJourney() {
    group('products journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/products`, 'victoria_sponge_slice');
        sleep(5);
    });
}

export function customerJourney() {
    group('customer journey', () => {
        simpleGetRequest(BASE_URL);
        sleep(5);
        simpleGetRequest(`${BASE_URL}api/customers`, 'Alice Baker');

        sleep(5);
    });
}



export function makeChild() {
    const randomNum = Math.floor(Math.random() * 1000000);
    
    const packet = JSON.stringify({
        name: `Clem H Fandango ${randomNum}`,
        email: `clem.H.fandango.${randomNum}@gmail.com`
    });
    sleep(5);
    const params = {
        headers: { 
            'Content-Type': 'application/json',
            'accept': '*/*',
            'origin': 'https://carter-singh-bakehouse.cta-training.academy',
            'referer': 'https://cta-training.academy'
        }
    };

    http.post('https://carter-singh-bakehouse.cta-training.academy/api/customers', packet, params);
    sleep(5);
}






export function makeOrder() {
    const packet = JSON.stringify({
        customerId: 4,
        items: [
            {
                productId: 11,
                quantity: 1
            }
        ]
    });
    sleep(5);

    const params = {
        headers: { 
            'Content-Type': 'application/json',
            'accept': '*/*',
            'origin': 'https://carter-singh-bakehouse.cta-training.academy',
            'referer': 'https://carter-singh-bakehouse.cta-training.academy/orders/new'
        }
    };

    http.post('https://carter-singh-bakehouse.cta-training.academy/api/orders', packet, params);
    sleep(5);
}


export function createProduct() {
    const randomNum = Math.floor(Math.random() * 1000000);
    sleep(5);
    
    const packet = JSON.stringify({
        productId: `clem_fandango_${randomNum}`,
        name: `Clem Fandango ${randomNum}`,
        category: "Clem Fandango",
        price: 100,
        pdfFile: "clem_fandango.pdf"
    });

    const params = {
        headers: { 
            'Content-Type': 'application/json',
            'accept': '*/*',
            'origin': 'https://carter-singh-bakehouse.cta-training.academy',
            'referer': 'https://carter-singh-bakehouse.cta-training.academy/products/new'
        }
    };

    http.post('https://carter-singh-bakehouse.cta-training.academy/api/products', packet, params);
    sleep(5);
}



function simpleGetRequest(pageUrl, expectedText = null) {
    const res = http.get(pageUrl);
    sleep(1);
    const success = check(res, {
        'status was 200': (r) => r.status === 200,
        ...(expectedText && {
            'page contains expected text': (r) =>
                r.body.includes(expectedText),
        }),
    });

    if (!success) {
        console.log(`\nFAILED REQUEST: ${pageUrl}`);
        console.log(`Status: ${res.status}`);

        if (expectedText) {
            console.log(`Expected text: ${expectedText}`);
            console.log(`Response body: ${res.body.substring(0, 500)}`);
        }
    }

    return res;
}
