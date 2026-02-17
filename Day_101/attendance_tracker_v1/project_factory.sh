#!/bin/bash
#
## ==============================
## STUDENT ATTENDANCE TRACKER - PROJECT FACTORY
## ==============================
#
## ---- Get Project Name ----
#read -p "Enter project name suffix: " input
#
#PROJECT_DIR="attendance_tracker_${input}"
#ARCHIVE_NAME="attendance_tracker_${input}_archive.tar.gz"
#
## ---- Cleanup Function (Trap Handler) ----
#cleanup() {
#    echo ""
#        echo "⚠️  Script interrupted! Archiving current state..."
#
#            if [ -d "$PROJECT_DIR" ]; then
#                    tar -czf "$ARCHIVE_NAME" "$PROJECT_DIR"
#                            rm -rf "$PROJECT_DIR"
#                                    echo "📦 Archived as $ARCHIVE_NAME"
#                                            echo "🧹 Incomplete directory removed."
#                                                fi
#
#                                                    exit 1
#                                                    }
#
#                                                    # Catch SIGINT (Ctrl+C)
#                                                    trap cleanup SIGINT
#
#                                                    # ---- Create Directory Structure ----
#                                                    echo "📁 Creating project structure..."
#
#                                                    mkdir -p "$PROJECT_DIR/Helpers"
#                                                    mkdir -p "$PROJECT_DIR/reports"
#
#                                                    touch "$PROJECT_DIR/attendance_checker.py"
#                                                    touch "$PROJECT_DIR/Helpers/assets.csv"
#                                                    touch "$PROJECT_DIR/Helpers/config.json"
#                                                    touch "$PROJECT_DIR/reports/reports.log"
#                                                    touch "$PROJECT_DIR/image.png"
#
#                                                    # ---- Default Config ----
#                                                    cat <<EOF > "$PROJECT_DIR/Helpers/config.json"
#                                                    {
#                                                        "warning_threshold": 75,
#                                                            "failure_threshold": 50
#                                                            }
#                                                            EOF
#
#                                                            # ---- Prompt for Threshold Update ----
#                                                            read -p "Do you want to update attendance thresholds? (y/n): " choice
#
#                                                            if [[ "$choice" == "y" || "$choice" == "Y" ]]; then
#                                                                read -p "Enter Warning Threshold (default 75): " warn
#                                                                    read -p "Enter Failure Threshold (default 50): " fail
#
#                                                                        warn=${warn:-75}
#                                                                            fail=${fail:-50}
#
#                                                                                # Stream Editing with sed (in-place)
#                                                                                    sed -i "s/\"warning_threshold\":.*/\"warning_threshold\": $warn,/" "$PROJECT_DIR/Helpers/config.json"
#                                                                                        sed -i "s/\"failure_threshold\":.*/\"failure_threshold\": $fail/" "$PROJECT_DIR/Helpers/config.json"
#
#                                                                                            echo "✅ Thresholds updated successfully."
#                                                                                            else
#                                                                                                echo "ℹ️  Using default thresholds."
#                                                                                                fi
#
#                                                                                                # ---- Health Check ----
#                                                                                                echo "🔍 Performing Python3 Health Check..."
#
#                                                                                                if python3 --version > /dev/null 2>&1; then
#                                                                                                    echo "✅ Python3 is installed:"
#                                                                                                        python3 --version
#                                                                                                        else
#                                                                                                            echo "⚠️  WARNING: Python3 is NOT installed on this system."
#                                                                                                            fi
#
#                                                                                                            # ---- Validate Directory Structure ----
#                                                                                                            echo "🔎 Validating project structure..."
#
#                                                                                                            if [ -f "$PROJECT_DIR/attendance_checker.py" ] &&
#                                                                                                               [ -f "$PROJECT_DIR/Helpers/assets.csv" ] &&
#                                                                                                                  [ -f "$PROJECT_DIR/Helpers/config.json" ] &&
#                                                                                                                     [ -f "$PROJECT_DIR/reports/reports.log" ]; then
#                                                                                                                         echo "✅ Directory structure verified."
#                                                                                                                         else
#                                                                                                                             echo "❌ Directory structure validation failed."
#                                                                                                                                 exit 1
#                                                                                                                                 fi
#
#                                                                                                                                 echo ""
#                                                                                                                                 echo "🎉 Project setup complete!"
#                                                                                                                                 echo "Location: $PROJECT_DIR"
#
