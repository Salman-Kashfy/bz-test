import { config } from 'dotenv';
import querystring from "querystring";
import path from "path";
import {Roles} from "../database/entity/root/enums";
config();

export enum NODE_ENV {
    local = 'local',
    prod = 'prod',
    dev = 'dev',
    stg = 'stg',
}

export const DEV_BASE_URL = 'https://dev-api.cloudfitnest.com'
export const PROD_BASE_URL = 'https://api.cloudfitnest.com'
export const basePath = getBasePath();
export const adminPlatformUrl = process.env.ADMIN_PLATFORM_URL || 'https://app.cloudfitnest.com';
export const defaultAdminId = 'ef7fa172-5139-4abd-8012-5245c4cd949e';
export const defaultBrandAdminId = 'c9e2e85e-a4f4-4bd5-be7b-e4cc10fb7bad';
export const defaultGymAdminId = 'c9e2e85e-a4f4-4bd5-be7b-e4cc10fb7baf';
export const defaultBrandId1 = 'd148f007-a398-44d2-a7da-5fb44d07a695';
export const defaultGymId = '11ab66c5-ffe1-4825-822b-16c4147b5172';
export const allPermissionId = '11ab66c5-ffe1-4825-822b-16c4147b5190';
export const superAdminId = 'dd2b73bd-7b75-5c45-9c19-97f77e03697a';
export const nodeEnv = process.env.NODE_ENV || NODE_ENV.local;
export const serviceName = process.env.SERVICE_NAME || 'vendors';
export const superAdmin = 'super admin';
export const brandAdmin = 'brand admin';
export const gymAdmin = 'gym admin';
export const disableAuthAccess = Boolean(process.env.DISABLE_AUTH_ACCESS) && process.env.DISABLE_AUTH_ACCESS === 'true' && false;
export const disableGraphqlIntrospection = process.env.DISABLE_INTROSPECTION === 'true';
export const authProfile = process.env.AUTH_PROFILE || 'super admin';
export const allowFilterPerRole = true;
export const TEMP_DIR_PATH = path.resolve(__dirname,'../../temp');
export const UPLOAD_DIR_PATH = path.resolve(__dirname,'../../uploads');
export const OTP_EXPIRY_IN_MINS = 5
export const APP_LOGO = 'https://cloudfitnest.s3.ap-south-1.amazonaws.com/cloudfitnest.PNG'
export const GUPSHUP_API_URL = 'https://api.gupshup.io/wa/api/v1'
export const WEBHOOK_TYPE = {
    SUBSCRIPTION: 'SUBSCRIPTION'
}
export const UPLOAD_DIR:any = {
    GYMS: '/gyms/',
    BRANDS: '/brands/',
    INSTRUCTORS: '/instructors/',
};

export const jwtConfig = {
    jwtSecretKey: process.env.JWT_SECRET_KEY || 'avQ3KLU76D4jM97Rea1Aokj61Kjs9N6OkqZxMnv41',
    accessTokenTTL: 3600*8, // 1 hour
    refreshTokenTTL: 3600 * 24 * 30, // 30days
    refreshTokenCookieExpiry: 3600000*24*30, // 30 days (In milliseconds)
}

export const redis = {
    enable: process.env.REDIS_ENABLE === 'true',
    defaultLongExpiryTimeInSec: 86400 * 2, // 86400 = a day
    defaultMediumExpiryTimeInSec: 3600, // 3600 = 1 hour
    defaultShortExpiryTimeInSec: 300, // 300 = 5 min
    connection: {
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: Number(process.env.REDIS_PORT || 6379),
    },
}

export const cronConfig = {
    freezeFrequency: "* * * * *",
    generalFrequency: "* * * * *",
};

export const platformAdminConfig = {
    name: process.env.PLATFORM_ADMIN_NAME || 'CloudFitnest',
    email: process.env.PLATFORM_ADMIN_EMAIL || 'support@cloudfitnest.com',
    password: process.env.PLATFORM_ADMIN_PASSWORD || '123456',
}
export const passwordResetJwtSecret = process.env.JWTSECRETKEY;
export const frontendApplicationUrl = process.env.ADMIN_PLATFORM_URL;

export const orderConfig = {
    receiptUrl: 'www.cloudfitnest.app/receipt',
    errorUrl: 'www.cloudfitnest.app/error',
};

export function getFakeAuth() {
    const auth:any = {
        admin: true,
    }
    switch (authProfile) {
        case "super admin":
            auth.id = defaultAdminId
            auth.roles = ['super admin'];
            break
        case "brand admin":
            auth.id = defaultBrandAdminId
            auth.roles = ['brand admin'];
            auth.brands = [defaultBrandId1];
            break
        case "gym admin":
            auth.id = defaultGymAdminId
            auth.roles = ['gym admin'];
            auth.gyms = [defaultGymId];
            break
        default:
            auth.roles = [];
            auth.adminId = null;
    }
    return auth
}

export const nbServicePackageFeatures = Number(process.env.NB_SERVICE_PACKAGE_FEATURES || '3');

export const buildAbsoluteUrl = (relativePath = '/', params = {}): string => {
    const _relativePath = relativePath.charAt(0) === '/' ? relativePath : `/${relativePath}`;
    let absoluteUrl = `${basePath}${_relativePath}`;
    if (Object.keys(params).length > 0) {
        absoluteUrl += `?${querystring.stringify(params)}`;
    }
    return absoluteUrl;
};

export const tapConfig = {
    callbackBaseUrl: buildAbsoluteUrl(`/orders/tap`),
    redirectUrl: adminPlatformUrl+'/payment-callback',
    apiUrl: process.env.TAP_PAYMENT_API_URL || '',
};

export const SEED_USERS = {
    SUPER_ADMIN: { ID: 1, NAME: 'HRM' },
    ADMIN: { ID: 2, NAME: 'Salman Kashfy' },
    HR_ADMIN: { ID: 3, NAME: 'Manahil Salman' },
    MANAGER: { ID: 4, NAME: 'Shahzain Kashfy' },
    EMPLOYEE: { ID: 5, NAME: 'Max Payne' },
}

export const ROLES = {
    SUPER_ADMIN: { ID: 1, NAME: Roles.SUPER_ADMIN },
    ADMIN: { ID: 2, NAME: Roles.ADMIN },
    HR_ADMIN: { ID: 3, NAME: Roles.HR_ADMIN },
    MANAGER: { ID: 4, NAME: Roles.MANAGER },
    EMPLOYEE: { ID: 5, NAME: Roles.EMPLOYEE },
}

export function getBasePath() {
    switch (process.env.NODE_ENV) {
        case NODE_ENV.prod:
            return PROD_BASE_URL
        case NODE_ENV.dev:
            return DEV_BASE_URL
        case NODE_ENV.local:
            return process.env.NODE_HOST
        default:
            return ''
    }
}