const { Prisma, PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class prismaHelper {

    async checkUniqueColumns(table) {
        try {
            const columns = await prisma.$queryRaw`
            SELECT COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, COLUMN_KEY, IS_NULLABLE
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_SCHEMA = 'personal_portofolio'
            AND TABLE_NAME = ${table}
            `;
        
            const hasUniqueColumn = columns.some((column) => column.COLUMN_KEY === "UNI");
            return hasUniqueColumn;
        } catch (error) {
            console.error(`Error checking unique columns for table '${table}':`, error);
            throw error;
        }
    }
}

module.exports = new prismaHelper()

