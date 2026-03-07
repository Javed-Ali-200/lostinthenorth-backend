import app from './app.js';
import env from './config/env.js';
import prisma from './config/prisma.js';
import { Server } from 'http';

const PORT = env.PORT;

const server: Server = app.listen(PORT, async () => {
    try {
        // Verify database connection on startup
        await prisma.$connect();
        console.log('✅ Database connected successfully');
    } catch (error: any) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }

    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║     🏔️  Lost in the North API          ║');
    console.log('╠════════════════════════════════════════╣');
    console.log(`║  🚀 Server:  http://localhost:${PORT}     ║`);
    console.log(`║  🌍 Env:     ${env.NODE_ENV.padEnd(27)}║`);
    console.log('║  💡 Health:  /health                   ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
});

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
const shutdown = async (signal: string) => {
    console.log(`\n⚠️  ${signal} received. Shutting down gracefully...`);
    server.close(async () => {
        await prisma.$disconnect();
        console.log('🔌 Database disconnected.');
        console.log('👋 Server closed. Goodbye!');
        process.exit(0);
    });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// ─── Unhandled Exceptions ─────────────────────────────────────────────────────
process.on('uncaughtException', (error: Error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason: any) => {
    console.error('💥 Unhandled Rejection:', reason);
    process.exit(1);
});
