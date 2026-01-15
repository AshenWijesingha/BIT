#!/usr/bin/env node

/**
 * Generate file list JSON from repository structure
 * This script scans the repository and creates a JSON file with all PDF files organized by folder
 */

const fs = require('fs');
const path = require('path');

// Directories to include in the scan
const INCLUDE_DIRS = ['BIT Project', 'Semester 5'];
// File extensions to include
const INCLUDE_EXTENSIONS = ['.pdf'];

/**
 * Recursively scan directory and build file tree
 * @param {string} dirPath - Directory path to scan
 * @param {string} relativePath - Relative path from root
 * @param {Set} visited - Set of visited directories to prevent infinite loops
 * @returns {Object|Array} - File tree structure
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
 * Generate the complete file structure
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
 * Main execution
 */
function main() {
    try {
        console.log('Scanning repository for PDF files...');
        const fileStructure = generateFileStructure();
        
        // Write to JSON file
        const outputPath = path.join(__dirname, 'files.json');
        fs.writeFileSync(outputPath, JSON.stringify(fileStructure, null, 2), 'utf8');
        
        console.log(`✓ Successfully generated files.json`);
        console.log(`  Found ${countFiles(fileStructure)} PDF files`);
        console.log(`  Organized in ${countFolders(fileStructure)} folders`);
        
    } catch (error) {
        console.error('Error generating file list:', error);
        process.exit(1);
    }
}

/**
 * Count total files in structure
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
 * Count total folders in structure
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

// Run the script
main();
