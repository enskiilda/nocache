# Operator - AI-Powered Computer Control Agent

## Overview

This is a Next.js application that implements an AI-powered computer control agent using Mistral AI and OnKernel SDK. The application allows users to interact with an AI assistant that can control a remote desktop environment through natural language commands. The AI can perform actions like clicking, typing, taking screenshots, and navigating web browsers to complete user tasks.

The application features a real-time chat interface where users can request tasks, and the AI agent executes them by controlling a remote desktop instance (provided by OnKernel/E2B browser automation).

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### November 21, 2025
- **Folder Restructure**: Renamed `/lib/e2b` folder to `/lib/kernel` to better reflect the OnKernel SDK usage
- **Cache Disabled**: Permanently disabled Next.js caching in development mode via `next.config.ts` (staleTimes set to 0)
- **Telemetry Disabled**: Created `.env.local` with `NEXT_TELEMETRY_DISABLED=1` to suppress telemetry prompts
- **Build Cache Cleared**: Removed `.next` folder to ensure clean build without old references
- **Updated Imports**: All imports updated from `@/lib/e2b/` to `@/lib/kernel/` across the codebase

### November 18, 2025
- **Replit Migration**: Migrated project from Vercel to Replit
- **Port Configuration**: Updated dev and start scripts to use port 5000 (required for Replit webview)
- **Workflow Setup**: Configured Next.js Dev Server workflow for automatic startup
- **Status**: Application running successfully on Replit

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15.2.1 with React 19 and TypeScript
- **App Router**: Uses Next.js App Router architecture with the `/app` directory structure
- **React Server Components**: Leverages RSC where applicable, with client components marked with `"use client"` directive
- **Styling**: TailwindCSS 4.0 with custom configuration and shadcn/ui component library
- **UI Components**: Built on Radix UI primitives (Dialog, Label, Slot, Tooltip) with custom styling
- **Animations**: Framer Motion (`motion` package v12.4.10) for UI animations
- **Theme Management**: `next-themes` for dark/light mode support
- **Fonts**: Custom Inter font loading via local font files with multiple weights

**State Management**:
- **Custom External Store Pattern**: Uses `useSyncExternalStore` hook with a custom `RealtimeSession` class for managing chat state
- **Real-time Updates**: Implements a subscription-based state management system that notifies components of state changes
- **Rationale**: Chosen over Redux/Context to provide fine-grained control over streaming updates and minimize re-renders during real-time AI responses

**Key UI Patterns**:
- **Resizable Panels**: Uses `react-resizable-panels` for split-view desktop preview and chat interface
- **Auto-scroll**: Custom `useScrollToBottom` hook that uses MutationObserver to automatically scroll chat to bottom on updates
- **Markdown Rendering**: `react-markdown` with `remark-gfm` for rendering formatted AI responses
- **Toast Notifications**: Sonner library for user feedback

### Backend Architecture

**API Routes**: Next.js API routes in `/app/api` directory
- **Runtime**: Node.js runtime (explicitly configured)
- **Streaming**: Server-Sent Events (SSE) for real-time AI response streaming
- **Long-running Requests**: Configured with `maxDuration: 3600` (1 hour) for extended task execution

**AI Integration**:
- **Primary AI Model**: Mistral AI (mistral-medium-2508) via `@mistralai/mistralai` SDK
- **Tool Calling**: Implements function calling for computer control actions
- **Available Tools**: 
  - `computer` tool with actions: `key`, `type`, `mouse_move`, `left_click`, `screenshot`, `cursor_position`, `left_click_drag`
- **Rationale**: Mistral chosen for its strong tool-calling capabilities and computer use understanding

**Computer Control**:
- **Desktop Provider**: OnKernel SDK (`@onkernel/sdk`) for browser automation and desktop simulation
- **Resolution**: Fixed 4:3 aspect ratio (1024x768) for consistent AI visual processing
- **Session Management**: Maintains persistent desktop sessions across multiple requests using sandbox IDs
- **Cleanup**: Dedicated `/api/kill-desktop` endpoint for terminating desktop sessions

**Message Processing**:
- **Message Pruning**: Implements smart message history management to reduce token usage by replacing screenshot tool results with text placeholders in history
- **State Tracking**: Tracks tool invocation states (streaming, call, result) for UI feedback
- **Error Handling**: Comprehensive error handling with user-friendly toast notifications

### External Dependencies

**AI Services**:
- **Mistral AI**: Primary language model for understanding user intent and generating computer control actions
- **API**: REST API with streaming support
- **Authentication**: API key-based (hardcoded in application per user requirements)

**Browser Automation**:
- **OnKernel SDK**: Provides remote desktop/browser instances for AI to control
- **Features**: Screenshot capture, mouse/keyboard control, viewport management
- **Authentication**: API key-based (hardcoded in application per user requirements)

**Third-party UI Libraries**:
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Accessible component primitives (Dialog, Label, Slot, Tooltip)
- **Lucide React**: Icon library for UI elements
- **TailwindCSS**: Utility-first CSS framework with custom theme configuration

**Analytics**:
- **Vercel Analytics**: Integrated for usage tracking and performance monitoring

**Notable Technical Decisions**:
- **Strict Mode Disabled**: `reactStrictMode: false` to prevent double-rendering issues during development with real-time streaming
- **Image Optimization Disabled**: `unoptimized: true` for images to support deployment flexibility
- **Package Import Optimization**: Experimental optimizePackageImports for faster builds with large UI libraries
- **No Database**: Application is stateless; all state managed in-memory during session
- **Hardcoded Credentials**: Per explicit user requirement, API keys are hardcoded rather than using environment variables