#!/usr/bin/env node

/**
 * ============================================================================
 * BIT REPOSITORY - FILE LIST GENERATOR
 * ============================================================================
 * 
 * This script scans the repository for PDF files and generates a JSON file
 * (files.json) that the web application uses to build the file tree navigation.
 * 
 * USAGE:
 *   node generate-file-list.js
 * 
 * OUTPUT:
 *   Creates/updates files.json in the repository root with the following structure:
 *   {
 *     "BIT Project": ["BIT Project/file1.pdf", ...],
 *     "Semester 5": {
 *       "_root": ["Semester 5/notice.pdf", ...],
 *       "Subject Name": ["Semester 5/Subject Name/lecture.pdf", ...]
 *     }
 *   }
 * 
 * FEATURES:
 *   - Recursive directory scanning
 *   - Symbolic link handling with circular reference detection
 *   - Atomic file writes to prevent corruption
 *   - JSON validation before writing
 *   - Comprehensive error handling
 * 
 * CONFIGURATION:
 *   - INCLUDE_DIRS: Directories to scan for PDF files
 *   - INCLUDE_EXTENSIONS: File extensions to include
 * 
 * @author BIT Repository
 * @version 1.1.0
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

/**
 * ============================================================================
 * CONFIGURATION
 * ============================================================================
 */

/** @constant {string[]} INCLUDE_DIRS - Directories to include in the scan */
const INCLUDE_DIRS = ['BIT Project', 'Semester 5'];

/** @constant {string[]} INCLUDE_EXTENSIONS - File extensions to include (lowercase) */
const INCLUDE_EXTENSIONS = ['.pdf'];

/**
 * ============================================================================
 * DIRECTORY SCANNING FUNCTIONS
 * ============================================================================
 */

/**
 * Recursively scans a directory and builds a file tree structure.
 * Handles symbolic links and prevents infinite loops from circular references.
 * 
 * @function scanDirectory
 * @param {string} dirPath - Absolute path to the directory to scan
 * @param {string} [relativePath=''] - Relative path from the repository root
 * @param {Set<string>} [visited=new Set()] - Set of visited real paths to prevent circular references
 * @returns {Object|Array} File tree structure:
 *   - Array of file paths if directory contains only files
 *   - Object with folder names as keys if directory contains subdirectories
 *   - Object with _root key for files and folder keys for subdirectories if both exist
 * 
 * @example
 * // Returns: ['Semester 5/file1.pdf', 'Semester 5/file2.pdf']
 * scanDirectory('/repo/Semester 5', 'Semester 5');
 * 
 * @example
 * // Returns: { _root: ['Semester 5/notice.pdf'], 'Subject': ['Semester 5/Subject/lecture.pdf'] }
 * scanDirectory('/repo/Semester 5', 'Semester 5');
 */
function scanDirectory(dirPath, relativePath = '', visited = new Set()) {
    // Prevent infinite loops from circular symlinks
    const realPath = fs.realpathSync(dirPath);
    if (visited.has(realPath)) {
        console.warn(`Circular symlink detected, skipping: ${dirPath}`);
        return [];
    }
    visited.add(realPath);
    
    const items = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = [];
    const folders = {};
    
    for (const item of items) {
        const itemPath = path.join(dirPath, item.name);
        const itemRelativePath = relativePath ? `${relativePath}/${item.name}` : item.name;
        
        try {
            if (item.isDirectory() || item.isSymbolicLink()) {
                // Skip hidden directories
                if (item.name.startsWith('.')) continue;
                
                // Check if symlink points to a directory
                const stats = fs.statSync(itemPath);
                if (!stats.isDirectory()) continue;
                
                // Recursively scan subdirectory with visited set
                const subContent = scanDirectory(itemPath, itemRelativePath, visited);
                
                // Only include folders that have content
                if (Array.isArray(subContent) ? subContent.length > 0 : Object.keys(subContent).length > 0) {
                    folders[item.name] = subContent;
                }
            } else if (item.isFile()) {
                // Check if file has allowed extension
                const ext = path.extname(item.name).toLowerCase();
                if (INCLUDE_EXTENSIONS.includes(ext)) {
                    files.push(itemRelativePath);
                }
            }
        } catch (err) {
            console.warn(`Error processing ${itemPath}:`, err.message);
            continue;
        }
    }
    
    // Organize return structure
    if (Object.keys(folders).length === 0) {
        // No subfolders, return just the files array
        return files;
    } else if (files.length === 0) {
        // Only subfolders, return folders object
        return folders;
    } else {
        // Both files and folders, use _root for files
        return {
            _root: files,
            ...folders
        };
    }
}

/**
 * ============================================================================
 * FILE STRUCTURE GENERATION
 * ============================================================================
 */

/**
 * Generates the complete file structure by scanning all configured directories.
 * Iterates through INCLUDE_DIRS and builds a hierarchical structure of PDF files.
 * 
 * @function generateFileStructure
 * @returns {Object} Object with directory names as keys and file structures as values
 * 
 * @example
 * const structure = generateFileStructure();
 * // Returns: { "BIT Project": [...], "Semester 5": {...} }
 */
function generateFileStructure() {
    const fileStructure = {};
    
    for (const dir of INCLUDE_DIRS) {
        const dirPath = path.join(__dirname, dir);
        
        try {
            if (fs.existsSync(dirPath)) {
                const content = scanDirectory(dirPath, dir);
                if (Array.isArray(content) ? content.length > 0 : Object.keys(content).length > 0) {
                    fileStructure[dir] = content;
                } else {
                    console.warn(`Warning: Directory "${dir}" exists but contains no PDF files`);
                }
            } else {
                console.warn(`Warning: Directory "${dir}" not found, skipping...`);
            }
        } catch (err) {
            console.error(`Error scanning directory "${dir}":`, err.message);
        }
    }
    
    if (Object.keys(fileStructure).length === 0) {
        console.warn('Warning: No PDF files found in any directory');
    }
    
    return fileStructure;
}

/**
 * ============================================================================
 * MAIN EXECUTION
 * ============================================================================
 */

/**
 * Main entry point for the file list generator.
 * Performs the following steps:
 * 1. Scans the repository for PDF files
 * 2. Validates the generated structure
 * 3. Writes to files.json using atomic write pattern
 * 4. Cleans up temporary files on error
 * 
 * @function main
 * @throws {Error} Exits with code 1 on any error
 */
function main() {
    try {
        console.log('Scanning repository for PDF files...');
        const fileStructure = generateFileStructure();
        
        // Validate structure before writing
        if (typeof fileStructure !== 'object' || fileStructure === null) {
            throw new Error('Invalid file structure generated');
        }
        
        const jsonString = JSON.stringify(fileStructure, null, 2);
        
        // Validate JSON is parseable
        try {
            JSON.parse(jsonString);
        } catch (parseError) {
            throw new Error(`Generated invalid JSON: ${parseError.message}`);
        }
        
        // Write to temporary file first (atomic write)
        const outputPath = path.join(__dirname, 'files.json');
        const tempPath = outputPath + '.tmp';
        
        fs.writeFileSync(tempPath, jsonString, 'utf8');
        
        // Rename temp file to final file (atomic operation on most systems)
        fs.renameSync(tempPath, outputPath);
        
        console.log(`✓ Successfully generated files.json`);
        console.log(`  Found ${countFiles(fileStructure)} PDF files`);
        console.log(`  Organized in ${countFolders(fileStructure)} folders`);
        
    } catch (error) {
        console.error('Error generating file list:', error);
        // Clean up temp file if it exists
        try {
            const tempPath = path.join(__dirname, 'files.json.tmp');
            if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
            }
        } catch (cleanupError) {
            // Ignore cleanup errors
        }
        process.exit(1);
    }
}

/**
 * ============================================================================
 * HELPER FUNCTIONS
 * ============================================================================
 */

/**
 * Recursively counts the total number of files in the structure.
 * 
 * @function countFiles
 * @param {Object|Array} obj - The file structure to count
 * @returns {number} Total number of PDF files
 */
function countFiles(obj) {
    let count = 0;
    if (Array.isArray(obj)) {
        return obj.length;
    }
    for (const value of Object.values(obj)) {
        if (Array.isArray(value)) {
            count += value.length;
        } else if (typeof value === 'object') {
            count += countFiles(value);
        }
    }
    return count;
}

/**
 * Recursively counts the total number of folders in the structure.
 * Excludes the _root key which represents files in the current folder.
 * 
 * @function countFolders
 * @param {Object|Array} obj - The file structure to count
 * @param {number} [level=0] - Current nesting level (used internally)
 * @returns {number} Total number of folders
 */
function countFolders(obj, level = 0) {
    let count = level > 0 ? 1 : 0;
    if (Array.isArray(obj)) {
        return 0;
    }
    for (const [key, value] of Object.entries(obj)) {
        if (key !== '_root' && typeof value === 'object') {
            count += countFolders(value, level + 1);
        }
    }
    return count;
}

/**
 * ============================================================================
 * SCRIPT EXECUTION
 * ============================================================================
 */

// Run the script
main();
