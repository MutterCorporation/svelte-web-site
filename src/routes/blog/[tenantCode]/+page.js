import { TENANT_CODES } from '../../../services/services/constants.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
    const tenantCode = params.tenantCode;
    
    // Verificar se o tenant code é válido
    const validTenantCodes = Object.values(TENANT_CODES);
    if (!validTenantCodes.includes(tenantCode)) {
        throw error(404, {
            message: `Tenant "${tenantCode}" não encontrado. Tenants disponíveis: ${validTenantCodes.join(', ')}`
        });
    }
    
    return {
        tenantCode
    };
};
