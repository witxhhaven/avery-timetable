# Calendar Application - Technical Specification

## Project Overview
A web-based calendar application with persistent user settings, even/odd week tracking, and subject display functionality.

---

## 1. Core Features

### 1.1 Calendar Display
- **Date Display**: 
  - Mini year text on top (recommended: 12-14px font size)
  - Large numeric date in middle (recommended: 64-96px font size)
  - Small month text below (recommended: 16-20px font size)
  - Format: Year as "YYYY", Date as "DD", Month as "MONTH"
  
- **Example**:
  ```
      2026
       15
    JANUARY
  ```

### 1.2 Navigation Controls
Three navigation buttons required:

1. **Previous Day Button** (`←` or "Yesterday")
   - Decrements date by 1 day
   - Updates display and week calculation

2. **Next Day Button** (`→` or "Tomorrow")
   - Increments date by 1 day
   - Updates display and week calculation

3. **Today Button** ("Today")
   - Jumps to current system date
   - Resets display to today

### 1.3 Week Type Indicator
- **Display**: Show either "Even Week" or "Odd Week"
- **Location**: Prominently displayed near the date
- **Interaction**: Clickable with edit icon/button
- **Visual Design**: Badge or chip component with distinct styling

### 1.4 Edit Week Type Dialog
- **Trigger**: Click on week indicator or dedicated edit button
- **Contents**:
  - Dropdown/select with two options:
    - "Even Week"
    - "Odd Week"
  - Save button (commits changes)
  - Cancel button (closes without saving)
- **Behavior**: 
  - Pre-select current week type
  - On save, update configuration and close dialog
  - On cancel, close without changes

### 1.5 Schedule Display
- Read complete daily schedule from JSON configuration file
- Display schedule for current day of week based on current week type (even/odd)
- Show time slots and corresponding subjects in chronological order on the right side
- Display format: "TIME - SUBJECT" (e.g., "7:35 - 8:05   English")
- Highlight subjects with special annotations (e.g., "English (Spelling)")
- Auto-update when date changes or week type changes
- **Weekend Handling**: When the date falls on Saturday or Sunday, display a message like "No school today" or "Weekend" instead of the schedule

---

## 2. Data Persistence Requirements

### 2.1 Configuration File

**File Name**: `calendar-config.json`

**File Location**: 
- Server-side: `./data/calendar-config.json` or `./config/calendar-config.json`
- Ensure directory exists or create on first run

**File Structure**:
```json
{
  "weekSettings": {
    "referenceDate": "2026-01-11",
    "weekType": "even"
  },
  "schedules": {
    "odd": {
      "Monday": [
        { "time": "7:35 - 8:05", "subject": "English" },
        { "time": "8:05 - 8:35", "subject": "English" }
      ],
      "Tuesday": [...],
      "Wednesday": [...],
      "Thursday": [...],
      "Friday": [...]
    },
    "even": {
      "Monday": [...],
      "Tuesday": [...],
      "Wednesday": [...],
      "Thursday": [...],
      "Friday": [...]
    }
  }
}
```

**Field Descriptions**:
- `referenceDate`: A known date with a known week type (ISO format: YYYY-MM-DD)
- `weekType`: Either "even" or "odd" for the reference date
- `schedules.odd`: Complete schedule for odd weeks, organized by day of week
- `schedules.even`: Complete schedule for even weeks, organized by day of week
- Each day contains an array of periods with `time` and `subject` fields
- Subjects may have annotations like "(Spelling)" to indicate special focus
- See the complete `calendar-config.json` file for full schedule data

### 2.2 Persistence Requirements
- **Must survive**: Application restart, server restart, browser close
- **Storage method**: File-based (NOT browser localStorage or sessionStorage)
- **Write timing**: Immediately after user commits changes
- **Read timing**: On application load and when needed
- **Error handling**: Gracefully handle missing or corrupted files

---

## 3. Week Calculation Logic

### 3.1 Algorithm
The application must calculate whether the current date falls in an even or odd week:

```
1. Load referenceDate and weekType from config file
2. Calculate daysDifference = currentDate - referenceDate (in days)
3. Calculate weeksPassed = Math.floor(Math.abs(daysDifference) / 7)
4. Determine currentWeekType:
   - If weeksPassed is even: currentWeekType = referenceWeekType
   - If weeksPassed is odd: currentWeekType = opposite(referenceWeekType)
```

### 3.2 Example Calculation
If config has:
- `referenceDate: "2026-01-11"` (Sunday)
- `weekType: "even"`

Then:
- Jan 11, 2026 → Even week (0 weeks from reference)
- Jan 18, 2026 → Odd week (1 week from reference)
- Jan 25, 2026 → Even week (2 weeks from reference)

### 3.3 User Override
When user manually changes week type via edit dialog:
- Update `referenceDate` to current displayed date
- Update `weekType` to user's selection
- Save to config file
- All future calculations use new reference point

---

## 4. Technical Implementation

### 4.1 Recommended Tech Stack

**Option A: Node.js Backend + HTML/CSS/JS Frontend**
- Backend: Express.js
- File operations: Node.js `fs` module
- Frontend: Vanilla JavaScript or React
- Communication: REST API or fetch

**Option B: Simple Node.js Script (Desktop-like)**
- Single-page application
- Local file system access
- No complex backend needed

**Option C: Electron Application**
- Full desktop app
- Direct file system access
- Cross-platform

### 4.2 File Operations

**Reading Configuration**:
```javascript
// Pseudocode
function loadConfig() {
  if (file exists at path) {
    read file
    parse JSON
    return config object
  } else {
    create default config
    save to file
    return default config
  }
}
```

**Writing Configuration**:
```javascript
// Pseudocode
function saveConfig(configObject) {
  stringify JSON with formatting
  write to file atomically
  handle write errors
  confirm success
}
```

**Default Configuration**:
If file is missing or corrupted, use the provided `calendar-config.json` file as the default, or create a minimal default:
```json
{
  "weekSettings": {
    "referenceDate": "<current_date>",
    "weekType": "even"
  },
  "schedules": {
    "even": {
      "Monday": [],
      "Tuesday": [],
      "Wednesday": [],
      "Thursday": [],
      "Friday": []
    },
    "odd": {
      "Monday": [],
      "Tuesday": [],
      "Wednesday": [],
      "Thursday": [],
      "Friday": []
    }
  }
}
```
**Note**: The complete, pre-populated `calendar-config.json` file with the full Avegy school schedule is provided separately and should be used as the starting configuration.

### 4.3 File Access Security
- Validate all file paths
- Use proper file permissions (read/write for owner only)
- Sanitize JSON inputs
- Handle concurrent access appropriately

---

## 5. User Interface Design

### 5.1 Layout Wireframe

**Two-Column Layout**: The application uses a split-screen design with date on the left and schedule on the right.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│           [←]    [  TODAY  ]    [→]                     │
│                                                         │
│  ┌──────────────────┐  ┌───────────────────────────┐   │
│  │                  │  │                           │   │
│  │      2026        │  │   7:35 - 8:05   English   │   │
│  │       15         │  │   8:05 - 8:35   English   │   │
│  │    JANUARY       │  │   8:35 - 9:05   English   │   │
│  │                  │  │   9:05 - 9:35   Recess    │   │
│  │  ┌────────────┐  │  │   9:35 - 10:05  Math      │   │
│  │  │ Even Week ✎│  │  │  10:05 - 10:35  Math      │   │
│  │  └────────────┘  │  │  10:35 - 11:05  PE        │   │
│  │                  │  │  11:05 - 11:35  Mother    │   │
│  └──────────────────┘  │                  Tongue    │   │
│                        │  11:35 - 12:05  Mother    │   │
│                        │                  Tongue    │   │
│                        │  12:05 - 12:35  Mother    │   │
│                        │                  Tongue    │   │
│                        │  12:35 - 1:05   PAL       │   │
│                        │   1:05 - 1:35   PAL       │   │
│                        │                           │   │
│                        └───────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Layout Details**:
- **Left Panel (Date Display)**:
  - Width: ~40% of screen or fixed width (300-400px)
  - Contains: Year, Date, Month, and Week indicator
  - Centered alignment for date elements
  - Week indicator positioned below date information

- **Right Panel (Schedule Display)**:
  - Width: ~60% of screen or remaining space
  - Contains: Time-based schedule for the current day
  - Left-aligned text for readability
  - Scrollable if schedule exceeds viewport height
  - Each period displayed as: "TIME   SUBJECT"

### 5.2 Edit Dialog Wireframe
```
┌────────────────────────────┐
│  Edit Week Type            │
├────────────────────────────┤
│                            │
│  Week Type:                │
│  [▼ Even Week       ]      │
│                            │
│      [Cancel]  [Save]      │
│                            │
└────────────────────────────┘
```

### 5.3 Styling Recommendations

**Colors**:
- Even Week: Blue/Teal (#3B82F6 or #14B8A6)
- Odd Week: Orange/Amber (#F97316 or #F59E0B)
- Buttons: Standard primary color
- Background: White or light gray (#F9FAFB)

**Typography**:
- Year text: Regular, 12-14px, sans-serif (mini size on top)
- Date number: Bold, 64-96px, sans-serif (big size in middle)
- Month text: Regular, 16-20px, sans-serif (small size on bottom)
- Subjects: Regular, 14-16px, sans-serif
- Buttons: Medium, 14-16px

**Spacing**:
- Generous padding around date (40-60px)
- 16-24px between elements
- 8-12px between subject items

---

## 6. Functional Requirements

### 6.1 Core Functionality Checklist
- [ ] Display current date with large number (middle)
- [ ] Display current year with mini text (top)
- [ ] Display current month with small text (bottom)
- [ ] Previous day button navigates backward
- [ ] Next day button navigates forward
- [ ] Today button returns to current date
- [ ] Display correct even/odd week indicator
- [ ] Edit button/clickable indicator opens dialog
- [ ] Dialog allows week type selection
- [ ] Save button updates and persists configuration
- [ ] Cancel button closes dialog without changes
- [ ] Display daily schedule for current day of week
- [ ] Show correct schedule based on even/odd week type
- [ ] Display time slots with corresponding subjects
- [ ] Highlight special subjects (e.g., with "(Spelling)" notation)
- [ ] Load configuration on application start
- [ ] Save configuration to file on changes
- [ ] Handle missing configuration file
- [ ] Handle corrupted configuration file
- [ ] Update schedule display when date changes
- [ ] Update schedule display when week type changes

### 6.2 State Management
The application must track:
- Current displayed date
- Current day of week (Monday-Friday)
- Current week type (calculated or overridden)
- Configuration data (reference date, week type, schedules)
- Current day's schedule (array of time slots and subjects)
- Dialog open/closed state
- Edit mode state

---

## 7. Error Handling

### 7.1 File System Errors
- **Missing config file**: Create default, log info message
- **Corrupted JSON**: Reset to default, log warning
- **Write permission denied**: Show user error, suggest fix
- **Disk full**: Show user error with actionable message
- **Path not found**: Create directory structure automatically

### 7.2 Data Validation
- Validate date formats (ISO 8601)
- Validate week type values ("even" or "odd" only)
- Validate subjects array (must be array of strings)
- Sanitize user inputs
- Handle empty or null values

### 7.3 User Feedback
- Success message on save (subtle, auto-dismiss)
- Error messages for failures (clear, actionable)
- Loading indicators for file operations
- Disabled states during processing

---

## 8. Testing Requirements

### 8.1 Unit Tests
- [ ] Week calculation algorithm
- [ ] Date navigation logic
- [ ] Configuration loading
- [ ] Configuration saving
- [ ] Default config generation

### 8.2 Integration Tests
- [ ] Full navigation flow
- [ ] Edit and save workflow
- [ ] Application restart with persistence
- [ ] Missing file recovery
- [ ] Corrupted file recovery

### 8.3 Manual Testing Scenarios
1. Start application → Verify default or existing config loads
2. Navigate backward/forward → Verify date changes
3. Click Today → Verify return to current date
4. Change week type → Verify update and persistence
5. Restart application → Verify settings retained
6. Delete config file → Verify graceful recovery
7. Corrupt config file → Verify graceful recovery
8. Change system date → Verify correct week calculation

---

## 9. Development Phases

### Phase 1: Basic Calendar Display
- Date display component
- Month/year display
- Navigation buttons (functional)
- Today button (functional)

### Phase 2: Week Calculation
- Implement week calculation algorithm
- Display even/odd indicator
- Test calculation with various dates

### Phase 3: Configuration Management
- JSON file reading
- JSON file writing
- Default configuration creation
- Error handling

### Phase 4: Edit Functionality
- Edit dialog UI
- Week type selection
- Save/Cancel operations
- Persistence integration

### Phase 5: Schedule Display
- Read daily schedules from config
- Determine current day of week
- Display appropriate schedule based on day and week type
- Format time slots and subjects
- Handle weekend display (no schedule message)
- Update on date/week change

### Phase 6: Polish & Testing
- Styling and responsive design
- Comprehensive error handling
- User feedback mechanisms
- Full test coverage

---

## 10. Deliverables

### 10.1 Code Files
- Main application file(s)
- Configuration management module
- UI components
- Styling (CSS)

### 10.2 Documentation
- README.md with setup instructions
- User guide
- Configuration file format documentation
- Development notes

### 10.3 Configuration
- Sample `calendar-config.json`
- Default configuration template

### 10.4 Tests
- Unit test suite
- Integration test suite
- Test documentation

---

## 11. Future Enhancements (Optional)

### 11.1 Additional Features
- Week number display (ISO week)
- Month view calendar
- Subject color coding
- Multiple calendars/profiles
- Export/import configuration
- Subject scheduling (time-based)
- Notes for specific dates
- Holiday indicators

### 11.2 Technical Improvements
- Database storage option
- Multi-user support
- Cloud sync
- Mobile responsive design
- Progressive Web App (PWA)
- Offline functionality
- Accessibility improvements (ARIA labels, keyboard navigation)

---

## 12. Acceptance Criteria

The application is complete when:

1. ✅ Date displays correctly with large number and small month text
2. ✅ All navigation buttons work correctly
3. ✅ Week type calculates accurately based on reference date
4. ✅ Week type can be manually edited via dialog
5. ✅ Configuration persists across application restarts
6. ✅ Configuration persists across server restarts
7. ✅ Subjects display correctly for current week type
8. ✅ Missing/corrupted config files are handled gracefully
9. ✅ All error cases are handled appropriately
10. ✅ Code is clean, commented, and maintainable

---

## 13. Technical Notes

### 13.1 Date Handling
- Use built-in Date object or library like `date-fns` or `dayjs`
- Store dates in ISO 8601 format (YYYY-MM-DD)
- Handle timezone consistently (recommend UTC or local)
- Consider daylight saving time transitions

### 13.2 File Paths
- Use path module for cross-platform compatibility
- Relative paths from application root
- Ensure directory creation before file writes
- Use atomic writes (write to temp, then rename)

### 13.3 JSON Formatting
- Pretty-print with 2-space indentation
- Maintain consistent ordering
- Validate before writing

### 13.4 Performance
- Cache configuration in memory
- Only write on actual changes
- Debounce frequent operations if needed

---

## Contact & Support

For questions or clarifications on this specification, please provide feedback through the development process.

**Specification Version**: 1.0  
**Last Updated**: January 2026  
**Target Completion**: [To be determined]
